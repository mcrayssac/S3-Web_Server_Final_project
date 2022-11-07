//Import services
const fileServices = require("./services");
const laureatesServices = require("./laureates.services");


/**
 * Feature 3 - Used to count the number of prizes offered
 * @param callback error if error, results if results
 * @returns {*} callback, number of prizes if results, else empty array
 */
const countPrizes = (callback) => {
    const file = fileServices.fileRead();
    let result = 0;
    file.forEach(element => {
        if (element.laureates && element.laureates.length > 0){
            result++;
        }
    });
    if (result > 0) {
        return callback(null,  result);
    } else {
        return callback(0);
    }
};


/**
 * Feature 5 - Used to count how many have won more than one Nobel Prize - sorted by decreasing counter
 * @param callback error if error, results if results
 * @returns {*} callback, array of laureates with more than one prize if results, else empty array
 */
const moreOnePrize = (callback) => {
    let laureatesResult = [];
    const allLaureates = laureatesServices.getAllLaureates(null, (error, results) =>{
        if (error) return error;
        return results;
    });
    if (allLaureates.length > 0){
        allLaureates.forEach(element => {
            let laureate = laureatesServices.getAllLaureates(element["id"], (error, results) => {
                if (error) return error;
                else return results;
            });
            if (laureate.length > 0 && laureate[0]["counter"] > 1){
                laureatesResult.push(laureate[0]);
            }

        });
        if (laureatesResult.length > 0){
            laureatesResult.sort((a, b) => b.counter - a.counter);
            return callback(null, laureatesResult);
        } else {
            return callback([]);
        }
    } else {
        return callback([]);
    }
};


/**
 * Feature 9 - For a given winner ID, used to display the prizes won
 * @param id laureate id
 * @param callback error if error, results if results
 * @returns {*} callback, laureate array with the prize(s) if results, else empty array
 */
const getPrizesLaureates = (id, callback) => {
    const file = fileServices.fileRead();
    let result = [];
    let firstNameSurName = []
    let prizes = []
    file.forEach(element => {
        if (element.laureates && element.laureates.length > 0){
            element["laureates"].forEach(element2 => {
                //console.log(element2);
                if (element2["id"] === id.toString()){
                    firstNameSurName = {id: element2.id, firstname: element2["firstname"], surname: element2["surname"]};
                    prizes.push({year: element["year"], category: element["category"], motivation: element2["motivation"]})
                }
            })
        }
    });
    if (firstNameSurName.id && firstNameSurName.firstname && firstNameSurName.surname && prizes.length > 0) {
        result.push(firstNameSurName);
        result.push(prizes)
        return callback(null,  result);
    } else {
        return callback([]);
    }
};

module.exports = {
    countPrizes : countPrizes,
    moreOnePrize : moreOnePrize,
    getPrizesLaureates : getPrizesLaureates
}