const validator = require("validator");
const chalk = require("chalk");
const middlewares = chalk.inverse.blue.bold.bgWhite("[Middlewares][id]");

/**
 * Used to validate query id laureate and to define if an id is given with package validator else setting id laureate at null
 * @param req access the request
 * @param res send a result(s)
 * @param next jump to the next function
 */
exports.validateQueryIdLaureates = (req, res, next) => {
    console.log(chalk.green.inverse(`${middlewares}  Request to validate query id received.`));
    if (typeof(req.query.idLaureate) === "undefined" || req.query.idLaureate.toString() === "undefined")
        req.query.idLaureate = null;
    next();
}

/**
 * Used to validate path id laureate with package validator else sending an error with 400 status
 * @param req access the request
 * @param res send a result(s)
 * @param next jump to the next function
 * @returns {*} sending an error with 400 status if the id is incorrectly entered
 */
exports.validatePathIdLaureates = (req, res, next) => {
    console.log(chalk.green.inverse(`${middlewares} Request to validate path id received.`));
    if (validator.isInt(req.params.idLaureate.toString())){
        next();
    } else {
        return res.status(400).send({success:0, data:`Bad request ! Id of the winner is not well informed.`});
    }
}