const validator = require("validator");
const chalk = require("chalk");
const fs = require("fs");
const middlewares = chalk.inverse.blue.bold.bgWhite("[Middlewares][new_laureate]");

//Import services
const services = require("../services/services");
const categoriesServices = require("../services/categories.services");

/**
 * Use to validate if Nobel Prize category, Nobel Prize year, firstname laureate, surname laureate and Nobel Prize motivation if they are correct for add laureate with package validator else send error on html page
 * @param req access the request
 * @param res send a result(s)
 * @param next jump to the next function
 */
exports.validateNewLaureate = (req, res, next) => {
    console.log(chalk.green.inverse(`${middlewares}  Request to validate new laureate received.`));
    let category = req.body.category.toString();
    let year = req.body.year.toString();
    let first_name = req.body.first_name.toString();
    let surname = req.body.surname.toString();
    let motivation = req.body.motivation.toString();
    let isValid = true;
    if (validator.isEmpty(year) || validator.isEmpty(first_name) || validator.isEmpty(surname)
        || validator.isEmpty(motivation) || !validator.isLength(first_name, 3, 50) || validator.isEmpty(category)
        || !validator.isLength(surname, 3, 50) || !listYear(year) || motivation.charAt(0) !== '"' ||
        motivation.lastIndexOf('"') !== motivation.length-1){
        isValid = false;
    }
    if (isValid){
        next();
    } else {
        res.render("new_laureate/new_laureate.hbs", ({
            categories: categoriesServices.getCategories((error, result) => {
                if (error) return error
                return result
            }),
            table : {color : "danger", res : "ERROR !", data : "Problems in typing !"}
        }));
    }
}

/**
 * Use to find data year in file read
 * @param data year given
 * @returns {boolean} if year given in file
 */
const listYear = (data) => {
    const file = services.fileRead();
    if (file.find(element => data === element["year"])) {
        console.log(chalk.green.inverse(`${middlewares} years found.`))
        return true;
    } else {
        console.log(chalk.red.inverse(`${middlewares} years not found.`))
        return false;
    }
};