//Import controllers
const yearsControllers = require("../controllers/years.controllers");

//Import middlewares needed
const validateYears = require("../middlewares/years.middlewares");

//Define router
const express = require("express");
const laureatesControllers = require("../controllers/laureates.controllers");
const router = express.Router();

//Years
//F8
router.get("/winners", yearsControllers.getLaureatesYearWinners);
/**
 * @swagger
 * /years/winners:
 *   get:
 *      description: For each year, used to indicate how many laureates had won a Nobel Prize - sorted by decreasing laureates
 *      tags:
 *          - For each year, get how many laureates won - sorted by decreasing laureates
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No laureates found
 */

//F10
router.get("/prizes/empty", yearsControllers.getYearsPrizesEmpty);
/**
 * @swagger
 * /years/prizes/empty:
 *   get:
 *      description: Used to show all years in which no Nobel Prize was awarded - sorted by decreasing years
 *      tags:
 *          - Get all years in which no Nobel Prize was awarded - sorted by decreasing years
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No years found
 */

//F11
router.get("/prizes/:sort", validateYears.validateSort, yearsControllers.getYearsPrizesSort);
/**
 * @swagger
 * /years/prizes/{sort}:
 *   get:
 *      description: Used to display all years of Nobel Prizes - sorted by decreasing or ascending laureates
 *      tags:
 *          - Display all years of Nobel Prizes sorted - sorted by decreasing or ascending laureates
 *      parameters:
 *          - in: path
 *            name: sort
 *            schema:
 *              type: string
 *            required: true
 *            example: -laureates, +laureates
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No years found
 */

module.exports = router;