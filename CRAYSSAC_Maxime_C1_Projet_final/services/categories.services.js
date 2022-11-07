//Import services
const fileServices = require("./services");


/**
 * Feature 6 - Used to list all categories of the Nobel Prizes
 * @param callback error if error, results if results
 * @returns {*} callback, array with categories if results, else empty array
 */
const getCategories = (callback) => {
    const file = fileServices.fileRead();
    let tableCategories = [];
    file.forEach(element1 => {
        if (!tableCategories.find(element2 => element2 === element1["category"])){
            tableCategories.push(element1["category"]);
        }
    });
    if (tableCategories.length > 0) {
        return callback(null,  tableCategories);
    } else {
        return callback([]);
    }
};


/**
 * Feature 7 - Used to determine which category has produced the most Nobel Prize winners
 * @param callback error if error, results if results
 * @returns {*} callback, dictionary with category if results, else empty array
 */
const categoriesPrizesMost = (callback) => {
    let mostLaureatesResult = [];
    const categories = getCategories((error, results) => {
        if (error) return error;
        return results;
    });
    const file = fileServices.fileRead();
    categories.forEach(data => {
        let counter = 0;
        file.forEach(element => {
            if ((data === element["category"]) && element.laureates && element.laureates.length > 0){
                element["laureates"].forEach(element2 => {
                    counter++;
                })
            }
        });
        mostLaureatesResult.push({category: data, counter: counter})
    });
    if (mostLaureatesResult.length > 0){
        mostLaureatesResult.sort((a, b) => b.counter - a.counter);
        return callback(null,  mostLaureatesResult[0]);
    } else {
        return callback([]);
    }
};

module.exports = {
    getCategories : getCategories,
    categoriesPrizesMost : categoriesPrizesMost
}