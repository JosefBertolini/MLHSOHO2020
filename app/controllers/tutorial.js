const express = require("express");
const GitHub = require("../services/github");

const router = express.Router();

const { Pool, Client } = require('pg');

router.get("/requesting", async function(req, res) {
  const { query = "" } = req.query;

  // console.log("banana");

  // let pool = new Pool({
  //     user: 'postgres',
  //     host: 'https://localhost:5432/',
  //     database: 'postgres',
  //     password: 'postgres',
  //     port: 5432,
  // });

  // pool.query("\\dt", (err, res) => {
  //   console.log(err, res);
  //   pool.end();
  // });


  if (!req.session.access_token) {
    return res.render("tutorial/index");
  }

  const github = new GitHub({ access_token: req.session.access_token });
  const results1 = await github.get("/user/starred");
  let results2 = query.length > 0 ? await github.get("/search/repositories", { q: query }) : [];
  results2 = results2.items || [];

  return res.render("tutorial/index", {
    tutorial1: results1.slice(0, 5),
    tutorial2: results2.slice(0, 5),
    query: query
  });

  

});

module.exports = router;
