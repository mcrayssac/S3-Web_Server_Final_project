const chalk = require("chalk");
const controllers = chalk.inverse.blue.bold.bgWhite("[Controllers][Prizes]");

//Import services
const prizesServices = require("../services/prizes.services");

//F3
exports.getCountPrizes = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 3 received : getCountPrizes`));
    prizesServices.countPrizes((error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 3 : ERROR : No prize found`));
            return res.status(400).send({success:0, data: `ERROR : No prize found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 3 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};

//F5
exports.getMoreOnePrize = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 5 received : getMoreOnePrize`));
    prizesServices.moreOnePrize((error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 5 : ERROR : No prize found`));
            return res.status(400).send({success:0, data: `ERROR : No prize found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 5 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};

//F9
exports.getPrizesLaureates = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request for feature 9 received : getPrizesLaureates`));
    let idLaureate = req.params.idLaureate;
    prizesServices.getPrizesLaureates(idLaureate, (error, results) => {
        if(error){
            console.log(chalk.red.inverse(`${controllers} Request for feature 9 : ERROR : No prize found`));
            return res.status(400).send({success:0, data: `ERROR : No prize found`});
        } else {
            console.log(chalk.green.inverse(`${controllers} Request for feature 9 : SUCCESS.`));
            return res.status(200).send({success:1, data:results});
        }
    });
};