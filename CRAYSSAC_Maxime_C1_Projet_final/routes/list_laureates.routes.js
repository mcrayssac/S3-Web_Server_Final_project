//Import controllers
const list_laureatesControllers = require("../controllers/list_laureates.controllers");

//Define router
const express = require("express");
const router = express.Router();

//list_laureates
router.get("/", list_laureatesControllers.list_laureates);

router.post("/", list_laureatesControllers.list_laureates);

module.exports = router;