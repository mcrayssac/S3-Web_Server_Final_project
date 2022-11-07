//Import controllers
const laureatesControllers = require("../controllers/laureates.controllers");

//Import middlewares needed
const validateId = require("../middlewares/id.middlewares");
const validateLaureates = require("../middlewares/laureates.middlewares");

//Define router
const express = require("express");
const router = express.Router();

//Laureates
//F1-F2
router.get("/", validateId.validateQueryIdLaureates, laureatesControllers.getLaureates);
/**
 * @swagger
 * /laureates:
 *   get:
 *      description: Used to get a laureate with his id or all laureates if empty - sorted by decreasing id
 *      tags:
 *          - Get one laureate or all laureates if empty - sorted by decreasing id
 *      parameters:
 *          - in: query
 *            name: idLaureate
 *            schema:
 *              type: int
 *            example: 6
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No laureates found
 */

//F4
router.get("/prizes/count", laureatesControllers.getCountLaureatesPrizes);
/**
 * @swagger
 * /laureates/prizes/count:
 *   get:
 *      description: Used to count the number of laureates who received Nobel Prizes
 *      tags:
 *          - Count the number of laureates who received Nobel Prizes
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No laureates found
 */

//F12
router.get("/:filter", validateLaureates.validateFilter, laureatesControllers.getLaureatesFilter);
/**
 * @swagger
 * /laureates/{filter}:
 *   get:
 *      description: From first name, or last name, or category, used to display all the winners that match the filter - sorted by decreasing id for filter name or surname, sorted by decreasing year for filter category
 *      tags:
 *          - Get display of all winners that match the filter
 *      parameters:
 *          - in: path
 *            name: filter
 *            schema:
 *              type: string
 *            required: true
 *            example: name, surname, category
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No filter found
 */

//F13
router.delete("/", validateLaureates.validateDeleteLaureates, laureatesControllers.deleteLaureates);
/**
 * @swagger
 *  /laureates:
 *     delete:
 *      description: Used to delete a laureate with a given ID in a given year and given category.
 *      tags:
 *          - Delete a laureate
 *      parameters:
 *          - in: query
 *            name: idLaureate
 *            schema:
 *              type: int
 *            required: true
 *            example: 6
 *          - in: query
 *            name: year
 *            schema:
 *                type: int
 *            required: true
 *            example: 1911
 *          - in: query
 *            name: category
 *            schema:
 *                type: string
 *            required: true
 *            example: chemistry
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: Can not delete laureate
 */

//F14
router.put("/motivation", validateLaureates.validatePutLaureates, laureatesControllers.putLaureates);
/**
 * @swagger
 *  /laureates/motivation:
 *     put:
 *      description: Used to update the motivation of a winner with a given identifier in a given year and a given category.
 *      tags:
 *          - Update laureate motivation
 *      parameters:
 *          - in: body
 *            name: laureate
 *            description: The user to create.
 *            schema:
 *              type: object
 *              required:
 *                  - idLaureate
 *                  - year
 *                  - category
 *                  - motivation
 *              properties:
 *                  idLaureate:
 *                      type: integer
 *                      example: 6
 *                  year:
 *                      type: integer
 *                      example: 1911
 *                  category:
 *                      type: string
 *                      example: chemistry
 *                  motivation:
 *                      type: string
 *                      example: in recognition of the extraordinary services they have rendered by their joint researches on the radiation phenomena discovered by Professor Henri Becquerel
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: Can not put laureate
 */

//F15
router.post("/", validateLaureates.validateAddLaureates, laureatesControllers.addLaureates);
/**
 * @swagger
 *  /laureates:
 *     post:
 *      description: Used to add a new winner to a given year and a given category.
 *      tags:
 *          - Add new laureate
 *      parameters:
 *          - in: body
 *            name: laureate
 *            description: The user to create.
 *            schema:
 *                type: object
 *                required:
 *                    - year
 *                    - category
 *                    - name
 *                    - surname
 *                    - motivation
 *                properties:
 *                    year:
 *                        type: integer
 *                        example: 1901
 *                    category:
 *                        type: string
 *                        example: chemistry
 *                    name:
 *                        type: string
 *                        example: Marie
 *                    surname:
 *                        type: string
 *                        example: Curie
 *                    motivation:
 *                        type: string
 *                        example: in recognition of the extraordinary services they have rendered by their joint researches on the radiation phenomena discovered by Professor Henri Becquerel
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: Can not add laureate
 */

module.exports = router;