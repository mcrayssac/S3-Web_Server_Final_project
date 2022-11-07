const chalk = require("chalk");
const controllers = chalk.inverse.blue.bold.bgWhite("[Controllers][Categories]");

//Import services
const categoriesServices = require("../services/categories.services");

//F6
exports.getCategories = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 6 received : getCategories`));
    categoriesServices.getCategories((error, results) => {
        if(error) {
            console.log(chalk.red.inverse(`${controllers} Request for feature 6 : ERROR : No categories found`));
            return res.status(400).send({success:0, data: `ERROR : No categories found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 6 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};

//F7
exports.categoriesPrizesMost = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 7 received : categoriesPrizesMost`));
    categoriesServices.categoriesPrizesMost((error, results) => {
        if(error) {
            console.log(chalk.red.inverse(`${controllers} Request for feature 7 : ERROR : No categories found`));
            return res.status(400).send({success:0, data: `ERROR : No categories found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 7 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};