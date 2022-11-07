const chalk = require("chalk");
const middlewares = chalk.inverse.blue.bold.bgWhite("[Middlewares][years]");

/**
 * Use to validate if sort given is -laureates or +laureates else send 404 error
 * @param req access the request
 * @param res send a result(s)
 * @param next jump to the next function
 * @returns {*} sending an error with 400 status if the id is incorrectly entered
 */
exports.validateSort = (req, res, next) => {
    console.log(chalk.green.inverse(`${middlewares}  Request to validate sort received.`));
    let sort = req.params.sort.toString();
    if (sort === "-laureates" || sort === "+laureates"){
        next();
    } else {
        return res.status(400).send({success:0, data:`Bad request ! Please enter -laureates or +laureates.`});
    }
}

