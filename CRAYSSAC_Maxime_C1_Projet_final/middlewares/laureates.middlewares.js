const validator = require("validator");
const chalk = require("chalk");
const middlewares = chalk.inverse.blue.bold.bgWhite("[Middlewares][filter]");

/**
 * Use to validate filter with checking if string is part of ASCII with package validator
 * @param req access the request
 * @param res send a result(s)
 * @param next jump to the next function
 * @returns {*} sending an error with 400 status if the id is incorrectly entered
 */
exports.validateFilter = (req, res, next) => {
    console.log(chalk.green.inverse(`${middlewares} Request to find filter received.`));
    if (validator.isAscii(req.params.filter.toString())){
        next();
    } else {
        return res.status(400).send({success:0, data:`Bad request ! Please enter name or surname or category.`});
    }
}

/**
 * Use to validate if id laureate, Nobel Prize year and Nobel Prize category if they are correct for delete laureate with package validator else send error 400
 * @param req access the request
 * @param res send a result(s)
 * @param next jump to the next function
 * @returns {*} sending an error with 400 status if the id is incorrectly entered
 */
exports.validateDeleteLaureates = (req, res, next) => {
    let idLaureate = req.query.idLaureate.toString()
    let year = req.query.year.toString()
    let category = req.query.category.toString()
    let isValid = true;

    idLaureate = typeof idLaureate === 'undefined' ? "" : idLaureate;
    year = typeof year === 'undefined' ? "" : year;
    category = typeof category === 'undefined' ? "" : category;

    if (validator.isEmpty(idLaureate) || idLaureate === "{laureateId}" || idLaureate === "undefined" ||
        validator.isEmpty(year) || year === "{year}" || year === "undefined" || validator.isEmpty(category) ||
        category === "{category}" || category === "undefined") {
        isValid = false;
    }
    if (isValid){
        if (validator.isInt(idLaureate) && validator.isInt(year) && validator.isAscii(category)) {
            next();
        } else {
            return res.status(400).send({success: 0, data: "Bad request !"});
        }
    } else {
        return res.status(400).send({success: 0, data: "Bad request !"});
    }
}

/**
 * Use to validate if id laureate, Nobel Prize year, Nobel Prize category and Nobel Prize motivation if they are correct for motivation laureate update with package validator else send error 400
 * @param req access the request
 * @param res send a result(s)
 * @param next jump to the next function
 * @returns {*} sending an error with 400 status if the id is incorrectly entered
 */
exports.validatePutLaureates = (req, res, next) => {
    let idLaureate = req.body.idLaureate.toString();
    let year = req.body.year.toString();
    let category = req.body.category.toString();
    let motivation = req.body.motivation.toString();
    let isValid = true;

    idLaureate = typeof idLaureate === 'undefined' ? "" : idLaureate;
    year = typeof year === 'undefined' ? "" : year;
    category = typeof category === 'undefined' ? "" : category;
    motivation = typeof motivation === 'undefined' ? "" : motivation;

    if (validator.isEmpty(idLaureate) || idLaureate === "{laureateId}" || idLaureate === "undefined" ||
        validator.isEmpty(year) || year === "{year}" || year === "undefined" ||validator.isEmpty(category) ||
        category === "{category}" || category === "undefined" || validator.isEmpty(motivation) ||
        motivation === "{motivation}" || motivation === "undefined"){
        isValid = false;
    }
    if (isValid){
        if (validator.isInt(idLaureate) && validator.isInt(year) && validator.isAscii(category) &&
            validator.isAscii(motivation)) {
            next();
        } else {
            return res.status(400).send({success: 0, data: "Bad request !"});
        }
    } else {
        return res.status(400).send({success: 0, data: "Bad request !"});
    }
}

/**
 * Use to validate if Nobel Prize year, Nobel Prize category, name laureate, surname laureate and Nobel Prize motivation if they are correct for add laureate with package validator else send error 400
 * @param req access the request
 * @param res send a result(s)
 * @param next jump to the next function
 * @returns {*} sending an error with 400 status if the id is incorrectly entered
 */
exports.validateAddLaureates = (req, res, next) => {
    let year = req.body.year.toString();
    let category = req.body.category.toString();
    let name = req.body.name.toString();
    let surname = req.body.surname.toString();
    let motivation = req.body.motivation.toString();
    let isValid = true;

    year = typeof year === 'undefined' ? "" : year;
    category = typeof category === 'undefined' ? "" : category;
    name = typeof name === 'undefined' ? "" : name;
    surname = typeof surname === 'undefined' ? "" : surname;
    motivation = typeof motivation === 'undefined' ? "" : motivation;

    if (validator.isEmpty(year) || year === "{year}" || year === "undefined" ||
        validator.isEmpty(category) || category === "{category}" || category === "undefined" ||
        validator.isEmpty(name) || name === "{name}" || name === "undefined" ||
        validator.isEmpty(surname) || surname === "{surname}" || surname === "undefined" ||
        validator.isEmpty(motivation) || motivation === "{motivation}" || motivation === "undefined"){
        isValid = false;
    }
    if (isValid){
        if (validator.isInt(year) && validator.isAscii(category) && validator.isAscii(name) &&
            validator.isAscii(surname) && validator.isAscii(motivation)) {
            next();
        } else {
            return res.status(400).send({success: 0, data: "Bad request !"});
        }
    } else {
        return res.status(400).send({success: 0, data: "Bad request !"});
    }
}