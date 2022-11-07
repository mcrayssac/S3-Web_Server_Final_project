//Import services
const fileServices = require("./services");


/**
 * Feature 8 - For each year, used to indicate how many laureates had won a Nobel Prize - sorted by decreasing laureates
 * @param callback error if error, results if results
 * @returns {*} callback, number of laureates if results, else empty array
 */
const getLaureatesYearWinners = (callback) => {
    let yearsLaureatesResult = [];
    let years = [];
    const file = fileServices.fileRead();
    file.forEach(elt => {
        if (years.indexOf(elt["year"]) < 0){
            years.push(elt["year"]);
        }
    });
    if (years.length > 0){
        years.forEach(data => {
            let counter = 0;
            file.forEach(element => {
                if ((data === element["year"]) && element.laureates && element.laureates.length > 0){
                    element["laureates"].forEach(element2 => {
                        counter++;
                    })
                }
            });
            yearsLaureatesResult.push({category: data, laureates: counter})
        });
    } else {
        return callback([]);
    }
    if (yearsLaureatesResult.length > 0){
        yearsLaureatesResult.sort((a, b) => b.laureates - a.laureates);
        return callback(null,  yearsLaureatesResult);
    } else {
        return callback([]);
    }
};


/**
 * Feature 10 - Used to show all years in which no Nobel Prize was awarded - sorted by decreasing years
 * @param callback error if error, results if results
 * @returns {*} callback, array of years without prizes if results, else empty array
 */
const getYearsPrizesEmpty = (callback) => {
    let yearsWithoutPrize = [];
    const laureatesYearWinners = getLaureatesYearWinners((error, results) => {
        if (error) return error;
        return results;
    });
    console.log(laureatesYearWinners.find(element => element.laureates.length === 0));
    console.log(laureatesYearWinners.find(element => element.laureates === 0));
    while (laureatesYearWinners.find(element => element.laureates === 0 || element.length === 0)){
        yearsWithoutPrize.push(laureatesYearWinners.find(element => element.laureates === 0 || element.length === 0));
        laureatesYearWinners.splice(laureatesYearWinners.indexOf(laureatesYearWinners.find(element => element.laureates === 0 || element.length === 0)), 1)
    }
    if (yearsWithoutPrize.length > 0){
        return callback(null,  yearsWithoutPrize);
    } else {
        return callback([]);
    }
};


/**
 * Feature 11 - Used to display all years of Nobel Prizes - sorted by decreasing or ascending laureates
 * @param sort -laureates for decreasing, +laureates for ascending
 * @param callback error if error, results if results
 * @returns {*} callback, array sort of years of Nobel Prizes if results, else empty array
 */
const getYearsPrizesSort = (sort, callback) => {
    const laureatesYearWinners = getLaureatesYearWinners((error, results) => {
        if (error) return error;
        return results;
    });
    while (laureatesYearWinners.find(element => element.laureates === 0 || element.length === 0)){
        laureatesYearWinners.splice(laureatesYearWinners.indexOf(laureatesYearWinners.find(element => element.laureates === 0 || element.length === 0)), 1)
    }
    if (laureatesYearWinners.length > 0){
        if (sort.charAt(0) === "-"){
            return callback(null,  laureatesYearWinners);
        } else {
            return callback(null,  laureatesYearWinners.sort((a, b) => a.laureates - b.laureates));
        }
    } else {
        return callback([]);
    }
};

module.exports = {
    getLaureatesYearWinners : getLaureatesYearWinners,
    getYearsPrizesEmpty : getYearsPrizesEmpty,
    getYearsPrizesSort : getYearsPrizesSort
}