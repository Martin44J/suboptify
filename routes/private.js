const { Router } = require("express");
const express = require("express");
const router = express.Router();
const {getPrivateData, watchlist, addToWatchlist} = require("../controllers/private");
const {protect} = require("../middleware/auth");


//if something goes wrong, protect (auth middleware) never calls next so get private data never called.
router.route("/").get(protect, getPrivateData);

router.route("/watchlist").get(protect, watchlist);
router.route("/watchlistadd").put(protect, addToWatchlist);

module.exports = router;