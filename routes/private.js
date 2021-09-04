const { Router } = require("express");
const express = require("express");
const router = express.Router();
const {getPrivateData} = require("../controllers/private");
const {protect} = require("../middleware/auth");


//if something goes wrong, protect (auth middleware) never calls next so get private data never called.
router.route("/").get(protect, getPrivateData);


module.exports = router;