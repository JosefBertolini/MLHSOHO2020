const URL = require('url');
const express = require('express');

const router = express.Router();


router.get("/", function(req, res) {

    return res.render("teams/teams.html");
});

module.exports = router;