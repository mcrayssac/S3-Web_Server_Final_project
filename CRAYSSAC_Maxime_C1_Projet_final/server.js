const express = require("express");
const hbsEngine = require("express-handlebars");
const chalk = require("chalk");
const app = express();
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const server = chalk.inverse.blue.bold.bgWhite("[Server]");

//Import all routes
const laureatesRoutes = require("./routes/laureates.routes");
const prizesRoutes = require("./routes/prizes.routes");
const categoriesRoutes = require("./routes/categories.routes");
const yearsRoutes = require("./routes/years.routes");
const list_laureatesRoutes = require("./routes/list_laureates.routes");
const new_laureateRoutes = require("./routes/new_laureate.routes");

//Environment and port configuration
dotEnv.config();
const port = process.env.PORT;

//Setting CSS, IMG, JS location
app.use(express.static(__dirname + "/public"));

//Set view engine
app.engine('hbs', hbsEngine.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set("view engine", 'hbs');
app.set("views", "./views");

//Setting ifCond for using conditions in handlebars
const hbs = hbsEngine.create({});
hbs.handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

//Setting bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Swagger initialization
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "Maxime CRAYSSAC final project app",
            description: "API documentation",
            contact: {
                name: "CRAYSSAC Maxime",
            },
            servers: [`http://localhost:${port}/`],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOption);

//Create path for swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Route definition for each path
app.use("/laureates/", laureatesRoutes);
app.use("/prizes/", prizesRoutes);
app.use("/categories/", categoriesRoutes);
app.use("/years/", yearsRoutes);
app.use("/list_laureates/", list_laureatesRoutes);
app.use("/new_laureate/", new_laureateRoutes);

//Send request / to /list_laureates/
app.use("/", (req, res) => {
    res.redirect("/list_laureates/");
});

//Give language and browser
app.use((req, res, next) => {
    console.log(`${server} IP : " + JSON.stringify(req.ip)`);
    console.log(`${server} Browser : " + req.headers["user-agent"]`);
    console.log(`${server} Language : " + req.headers["accept-language"]`);
    next();
});

//If path is not in the functions before, then an error is created
app.use("*", (req, res, next) => {
    const err = new Error(`${server} Not found !`);
    err.status = 404;
    next(err);
});

//We display the error 404 : Not found!
app.use((err, req, res, next) => {
    console.error(chalk.inverse.grey.bgRed.bold(err.stack));
    res.render("error404.hbs");
});

//Port display
app.listen(port, () => {
    console.log(chalk.inverse.black.bold.bgGreen(`${server} Bienvenue, l'application écoute sur le port ${port}.`));
});