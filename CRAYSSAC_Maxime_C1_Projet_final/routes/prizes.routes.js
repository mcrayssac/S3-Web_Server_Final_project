//Import controllers
const prizesControllers = require("../controllers/prizes.controllers");

//Import middlewares needed
const validateId = require("../middlewares/id.middlewares");

//Define router
const express = require("express");
const router = express.Router();

//Prizes
//F3
router.get("/count", prizesControllers.getCountPrizes);
/**
 * @swagger
 * /prizes/count:
 *   get:
 *      description: Used to count the number of prizes offered
 *      tags:
 *          - Count the number of prizes offered
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No prize found
 */

//F5
router.get("/more/one", prizesControllers.getMoreOnePrize);
/**
 * @swagger
 * /prizes/more/one:
 *   get:
 *      description: Used to count how many have won more than one Nobel Prize - sorted by decreasing counter
 *      tags:
 *          - More than one Nobel Prize - sorted by decreasing counter
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No prize found
 */

//F9 à regarder
router.get("/laureates/:idLaureate", validateId.validatePathIdLaureates, prizesControllers.getPrizesLaureates);
/**
 * @swagger
 * /prizes/laureates/{idLaureate}:
 *   get:
 *      description: For a given winner ID, used to display the prizes won
 *      tags:
 *          - Get prizes won for a given ID
 *      parameters:
 *          - in: path
 *            name: idLaureate
 *            schema:
 *              type: int
 *            required: true
 *            example: 6
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '400':
 *              description: No laureate found
 */

module.exports = router;