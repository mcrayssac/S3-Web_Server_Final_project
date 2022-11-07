const chalk = require("chalk");
const controllers = chalk.inverse.blue.bold.bgWhite("[Controllers][new_laureate]");

//Import services
const categoriesServices = require("../services/categories.services");
const laureatesServices = require("../services/laureates.services");

exports.new_laureate = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request to add laureate received.`));
    res.render("new_laureate/new_laureate.hbs", ({
        categories: categoriesServices.getCategories((error, result) => {
            if (error) return error
            return result
        })
    }));
}

exports.new_laureate_add = (req, res) => {
    console.log(chalk.white.inverse(`${controllers} Request to add laureate after validate received.`));
    res.render("new_laureate/new_laureate.hbs", ({
        categories: categoriesServices.getCategories((error, result) => {
            if (error) return error
            return result
        }),
        table : laureatesServices.addLaureates(req.body.year, req.body.category, req.body.first_name, req.body.surname,
            req.body.motivation, (error, results) => {
                if (error) return {color : "danger", res : "ERROR !", data : "Already in list or Years gives no prizes !"}
                return {color : "success", res : "SUCCESS !", data : results}
            })
    }));
}