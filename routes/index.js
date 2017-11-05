const express = require("express"),
  router = express.Router(),

  router.get("/analyzeImage", function(req, res) {
      res.render("analysis");
  });

module.exports = router;
