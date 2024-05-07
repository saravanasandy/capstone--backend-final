const express = require("express");
const router = express.Router();
const {
    getFlights,
    setFlight,
    updateFlight,
    deleteFlight,
} = require("../controllers/flightController");

const {protect} = require('../middleware/authMiddleware')

router.get("/",protect, getFlights);

router.post("/", protect, setFlight);

router.put("/:id",protect, updateFlight );

router.delete("/:id",protect, deleteFlight);

module.exports = router;