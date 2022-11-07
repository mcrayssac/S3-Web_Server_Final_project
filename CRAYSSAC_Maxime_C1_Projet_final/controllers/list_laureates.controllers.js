const chalk = require("chalk");
const controllers = chalk.inverse.blue.bold.bgWhite("[Controllers][list_laureates]");

//Import services
const categoriesServices = require("../services/categories.services");
const laureatesServices = require("../services/laureates.services");

exports.list_laureates = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for list_laureates view received : list_laureates`));
    res.render("list_laureates/list_laureates.hbs", ({
        categories: categoriesServices.getCategories((error, result) => {
            if (error) return error
            return result
        }),
        category : req.body.category,
        laureates: laureatesServices.filter(req.body.category, (error, result) => {
            if (error) return error
            return result
        })
    }));
}