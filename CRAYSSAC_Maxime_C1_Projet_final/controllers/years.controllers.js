const chalk = require("chalk");
const controllers = chalk.inverse.blue.bold.bgWhite("[Controllers][Years]");

//Import services
const yearsServices = require("../services/years.services");

//F8
exports.getLaureatesYearWinners = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 8 received : getLaureatesYearWinners`));
    yearsServices.getLaureatesYearWinners((error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 8 : ERROR : No laureates found`));
            return res.status(400).send({success:0, data: `ERROR : No laureates found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 8 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};

//F10
exports.getYearsPrizesEmpty = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 10 received : getYearsPrizesNone`));
    yearsServices.getYearsPrizesEmpty((error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 10 : ERROR : No years found`));
            return res.status(400).send({success:0, data: `ERROR : No years found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 10 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};

//F11
exports.getYearsPrizesSort = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 11 received : getYearsPrizesSort`));
    let sort = req.params.sort.toString();
    yearsServices.getYearsPrizesSort(sort, (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 11 : ERROR : No years found`));
            return res.status(400).send({success:0, data: `ERROR : No years found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 11 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};