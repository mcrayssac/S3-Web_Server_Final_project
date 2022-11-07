//Import controllers
const new_laureateControllers = require("../controllers/new_laureate.controllers");

//Import middlewares needed
const validateUser = require("../middlewares/new_laureate.middlewares");

//Define router
const express = require("express");
const router = express.Router();

//new_laureate
router.get("/", new_laureateControllers.new_laureate);

router.post("/", validateUser.validateNewLaureate, new_laureateControllers.new_laureate_add);

module.exports = router;