const express = require("express");

const router = express.Router();

router.get("/info", (req, res) => {
  res.send("info...");
});

module.exports = router;
