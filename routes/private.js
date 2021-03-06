const { Router } = require("express");
const express = require("express");
const router = express.Router();
const {getPrivateData, watchlist, addToWatchlist, removeFromWatchlist, preferences, preferencesChanged, getAllServices} = require("../controllers/private");
const {protect} = require("../middleware/auth");


//if something goes wrong, protect (auth middleware) never calls next so get private data never called.
router.route("/").get(protect, getPrivateData);

router.route("/watchlist").get(protect, watchlist);
router.route("/watchlistadd").put(protect, addToWatchlist);
router.route("/watchlistremove").put(protect, removeFromWatchlist);

router.route("/preferences").get(protect, preferences);
router.route("/preferenceschanged").put(protect, preferencesChanged);
router.route("/fetchallpreferences").put(protect, getAllServices);

module.exports = router;