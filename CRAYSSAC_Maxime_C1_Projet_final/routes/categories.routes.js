//Import controllers
const categoriesControllers = require("../controllers/categories.controllers");

//Define router
const express = require("express");
const router = express.Router();

//Categories
//F6
router.get("/", categoriesControllers.getCategories);
/**
 * @swagger
 * /categories:
 *   get:
 *      description: Used to list all categories of the Nobel Prizes
 *      tags:
 *          - Get all categories
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No categories found
 */

//F7
router.get("/prizes/most", categoriesControllers.categoriesPrizesMost);
/**
 * @swagger
 * /categories/prizes/most:
 *   get:
 *      description: Used to determine which category has produced the most Nobel Prize winners
 *      tags:
 *          - Get category with the most Nobel Prize winners
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No categories found
 */

module.exports = router;