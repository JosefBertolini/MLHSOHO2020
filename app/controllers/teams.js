const express = require('express');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

const router = express.Router();


router.get("/", function(req, res) {
    console.log(req.query);

    var members = "<ul>\n";
    var hack_name = "";
    switch(req.query["hackathon"]) {
        case 'SunsOutHacksOut':
            hack_name = "Suns Out Hacks Out";
            break;
        case 'FirstDayBackHacks':
            hack_name = "First Day Back Hacks";
            break;
        case 'MedHacks':
            hack_name = "MedHacks";
            break;
    }
    //console.log(path.relative(__filename, "C:\\Users\\J03da\\Projects\\Repos\\mlh-soho-2020\\mlh-hackathon-nodejs-starter\\app\\resources\\hackers.txt"));
    fs.readFile(".\\app\\resources\\hackers.txt", "utf-8", (err, file) => {
        'use-strict'
        if(err) throw err;
    
        // console.log(file);

        file = file.split('\r\n');
        for (var line in file) {
            line = file[line].split(', ');
            // console.log(line);
            if (line[1] == hack_name && line[2] == "false") {
                members += "<li>" + line[0] + "</li>\n";
            }
        }
        members += '</ul>'

        // console.log(members)
        
        fs.readFile(".\\app\\templates\\teams\\index.html", "utf-8", (err2, data) => {
            if (!err2)
            {
                fs.readFile(".\\app\\templates\\partials\\header.html", "utf-8", (err3, head) => {
                    if (!err3)
                    {
                        res.send(head + data + members);
                    }
                    else 
                    {
                        res.send(data + members);
                    }
                }) 
            }
            else
            {
                res.send(members);
            }
        })
    });
});

module.exports = router;