const chalk = require("chalk");
const controllers = chalk.inverse.blue.bold.bgWhite("[Controllers][Laureates]");

//Import services
const laureatesServices = require("../services/laureates.services");

//F1-F2
exports.getLaureates = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 1-2 received : getLaureates`));
    let idLaureate = req.query.idLaureate
    laureatesServices.getAllLaureates(idLaureate, (error, results) => {
        if(error) {
            console.log(chalk.red.inverse(`${controllers} Request for feature 1-2 : ERROR : No laureates found`));
            return res.status(400).send({success:0, data: `ERROR : No laureates found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 1-2 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    })
};

//F4
exports.getCountLaureatesPrizes = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 4 received : getCountLaureatesPrizes`));
    laureatesServices.countPrizesLaureates((error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 4 : ERROR : No laureates found`));
            return res.status(400).send({success:0, data: `ERROR : No laureates found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 4 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};

//F12
exports.getLaureatesFilter = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 12 received : getLaureatesFilter`));
    let filter = req.params.filter.toString()
    laureatesServices.filter(filter, (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 12 : ERROR : No laureates found`));
            return res.status(400).send({success:0, data: `ERROR : No laureates found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 12 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};

//F13
exports.deleteLaureates = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 13 received : deleteLaureates`));
    let idLaureate = req.query.idLaureate.toString()
    let year = req.query.year.toString()
    let category = req.query.category.toString()

    laureatesServices.deleteLaureates(idLaureate, year, category, (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 13 : ERROR : Can not delete laureate`));
            return res.status(400).send({success:0, data: `ERROR : Can not delete laureate`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 13 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};

//F14
exports.putLaureates = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 14 received : putLaureates`));
    let idLaureate = req.body.idLaureate.toString();
    let year = req.body.year.toString();
    let category = req.body.category.toString();
    let motivation = req.body.motivation.toString();

    laureatesServices.putLaureates(idLaureate, year, category, motivation, (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 14 : ERROR : Can not put laureate`));
            return res.status(400).send({success:0, data: `ERROR : Can not put laureate`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 14 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};

//F15
exports.addLaureates = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 15 received : addLaureates`));
    let year = req.body.year.toString();
    let category = req.body.category.toString();
    let name = req.body.name.toString();
    let surname = req.body.surname.toString();
    let motivation = req.body.motivation.toString();

    laureatesServices.addLaureates(year, category, name, surname, motivation, (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 15 : ERROR : Can not add laureate`));
            return res.status(400).send({success:0, data: `ERROR : Can not add laureate`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 15 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};