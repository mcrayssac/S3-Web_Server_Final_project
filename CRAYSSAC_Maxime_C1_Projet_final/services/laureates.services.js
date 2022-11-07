//Import services
const fileServices = require("./services");
const categoriesServices = require("./categories.services");

/**
 * Feature 1, 2 - Used to get a laureate with his id or all laureates if empty - sorted by decreasing id
 * @param id laureate id
 * @param callback error if error, results if results
 * @returns {*} callback, array with laureates if results and id is NULL, array with laureate if results and id in file
 *      else empty array
 */
const getAllLaureates = (id, callback) => {
    const file = fileServices.fileRead();
    let result = [];
    let counter = 0;
    if (file.length > 0){
        file.forEach(element => {
            if (element.laureates && element.laureates.length > 0){
                element["laureates"].forEach(element2 => {
                    if (id !== null){
                        if (element2["id"] === id.toString()){
                            counter++;
                            if (result.length === 0){
                                result.push({id: element2["id"], firstname: element2["firstname"], surname: element2["surname"]});
                            }
                        }
                    } else {
                        if (result.find(elt => elt.id === element2["id"])){
                            //Duplicate found
                        } else {
                            result.push({id: element2["id"], firstname: element2["firstname"], surname: element2["surname"]});
                        }
                    }
                })
            }
        });
    }
    if (result.length > 0) {
        if (id !== null){
            result[0]["counter"] = counter;
        } else {
            result.sort((a, b) => b.id - a.id);
        }
        return callback(null,  result);
    } else {
        return callback([]);
    }
};


/**
 * Feature 4 - Used to count the number of laureates who received Nobel Prizes
 * @param callback error if error, results if results
 * @returns {*} callback, number of laureates if results, else empty array
 */
const countPrizesLaureates = (callback) => {
    const allLaureates = getAllLaureates(null, (error, results) =>{
        if (error) return error;
        return results;
    });
    if (allLaureates.length > 0){
        return callback(null, allLaureates.length);
    } else {
        return callback([]);
    }
};


/**
 * Feature 12 - From first name, or last name, or category, used to display all the winners that match the filter - sorted by decreasing id for filter name or surname, sorted by decreasing year for filter category
 * @param filter name or surname of laureate or category of Nobel Prizes
 * @param callback error if error, results if results
 * @returns {*} callback, laureate if filter = name or surname and if results, laureates matches with category filter
 *      else empty array
 */
const filter = (filter, callback) => {
    let resultsFilter = [];
    let results = getAllLaureates(null, (error, results) => {
        if (error) return error
        else return results
    });
    while (results.find(element => element.firstname === filter || element.surname === filter)) {
        resultsFilter.push(results.find(element => element.firstname === filter || element.surname === filter));
        results.splice(results.indexOf(results.find(element => element.firstname === filter || element.surname === filter)), 1);
    }
    if (resultsFilter.length > 0) {
        return callback(null, resultsFilter);
    }
    results = categoriesServices.getCategories((error, results) => {
        if (error) return error
        else return results
    });
    if (results.find(element => element === filter)) {
        const file = fileServices.fileRead()
        file.forEach(element => {
            if ((filter === element["category"]) && element.laureates && element.laureates.length > 0) {
                element["laureates"].forEach(element2 => {
                    resultsFilter.push({
                        firstname: element2["firstname"],
                        surname: element2["surname"],
                        year: element["year"]
                    });
                })
            }
        });
    }
    if (resultsFilter.length > 0) {
        return callback(null, resultsFilter);
    } else {
        return callback([]);
    }
};


/**
 * Feature 13 - Used to delete a laureate with a given ID in a given year and given category
 * @param id laureate id
 * @param year Nobel Prize year
 * @param category Nobel Prize category
 * @param callback error if error, results if results
 * @returns {*} callback, laureate deleted if results, else empty array
 */
const deleteLaureates = (id, year, category, callback) => {
    const file = fileServices.fileRead();
    let result = [];
    id = parseInt(id);
    year = parseInt(year);
    file.forEach(element => {
        if (element.year === year.toString() && element.category === category && element.laureates.length > 0){
            element.laureates.forEach(element2 => {
                if (element2.id === id.toString()){
                    result.push(file[file.indexOf(element)].laureates[file[file.indexOf(element)].laureates.indexOf(element2)]);
                    file[file.indexOf(element)].laureates.splice(file[file.indexOf(element)].laureates.indexOf(element2), 1);
                    fileServices.fileSave(file);
                }
            });
        }
    });
    if (result.length > 0) {
        return callback(null, result);
    } else {
        return callback([]);
    }
};


/**
 * Feature 14 - Used to update the motivation of a winner with a given identifier in a given year and a given category
 * @param id laureate id
 * @param year Nobel Prize year
 * @param category Nobel Prize category
 * @param motivation Nobel Prize motivation
 * @param callback error if error, results if results
 * @returns {*} callback, laureate with updated motivation if results, else empty array
 */
const putLaureates = (id, year, category, motivation, callback) => {
    const file = fileServices.fileRead();
    let result = [];
    file.forEach(element => {
        if (element.year === year && element.category === category && element.laureates.length > 0){
            element.laureates.forEach(element2 => {
                if (element2.id === id){
                    file[file.indexOf(element)].laureates[file[file.indexOf(element)].laureates.indexOf(element2)].motivation = motivation;
                    result.push(file[file.indexOf(element)].laureates[file[file.indexOf(element)].laureates.indexOf(element2)]);
                    fileServices.fileSave(file);
                }
            });
        }
    });
    if (result.length > 0) {
        return callback(null, result);
    } else {
        return callback([]);
    }
};


/**
 * Feature 15 - Used to add a new winner to a given year and a given category
 * @param year Nobel Prize year
 * @param category Nobel Prize category
 * @param name laureate name
 * @param surname laureate surname
 * @param motivation Nobel Prize motivation
 * @param callback error if error, results if results
 * @returns {*} callback, laureate added if results, else empty array
 */
const addLaureates = (year, category, name, surname, motivation, callback) => {
    const file = fileServices.fileRead();
    let result = null;
    let idLaureate = null;
    const nameResults = filter(name, (error, results) => {
        if (error) return error;
        return results;
    });
    //console.log("nameResults :", nameResults);

    const surNameResults = filter(surname, (error, results) => {
        if (error) return error;
        return results;
    });
    //console.log("surNameResults :", surNameResults);

    nameResults.forEach(element => {
        idLaureate = surNameResults.find(element2 => element2.id === element.id
            && element2.firstname === element.firstname
            && element2.surname === element.surname).id;
    });
    //console.log("id :", idLaureate);

    if (idLaureate === null){
        const laureates = getAllLaureates(null, (error, results) => {
            if (error) return error
            return results
        });
        idLaureate = 0;
        laureates.forEach(element => {
            if (parseInt(element.id) > idLaureate){
                idLaureate = parseInt(element.id);
            }
        });
        idLaureate++;
    }
    //console.log("id2 :", idLaureate);

    file.forEach(element => {
        if (element.year === year.toString() && element.category === category.toString() && element.laureates){
            if(!element.laureates.find(element2 => element2.id === idLaureate)){
                element.laureates.push({id: idLaureate.toString(), firstname: name, surname: surname, motivation: motivation});
                result = {year: year, category: category, id: idLaureate.toString(), firstname: name, surname: surname, motivation: motivation};
                fileServices.fileSave(file);
            }
        }
    });
    if (result) {
        return callback(null, result);
    } else {
        return callback([]);
    }
};

module.exports = {
    getAllLaureates : getAllLaureates,
    countPrizesLaureates : countPrizesLaureates,
    filter : filter,
    deleteLaureates : deleteLaureates,
    putLaureates : putLaureates,
    addLaureates : addLaureates
}