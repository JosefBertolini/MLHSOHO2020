const express = require('express');
const fs = require('fs');
const path = require('path');

const { fileURLToPath } = require('url');

const router = express.Router();


router.get("/", function(req, res) {
    // console.log(req.query);

    
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
    var members = "<div class=\"hackathon-title\">" + hack_name + ":</div><div class=\"free-hackers\">\n";
    fs.readFile(".\\app\\resources\\hackers.json", "utf-8", (err, file) => {
        if(err) throw err;
        var hackerArray = JSON.parse(file)["hackers"];
        // file = file.split('\r\n');
        for (var hacker in hackerArray) {
            hacker = hackerArray[hacker];
            //console.log(hacker);
            console.log(hacker["hackathon"]);
            if (hacker["hackathon"] == hack_name && hacker["has_team"] == "false") {
                members += "<p>" + hacker["name"] + "<br>Favorite Language: " + hacker["favorite_languages"] + "</p>\n";
            }
        }
        members += '</div>'
        
        //console.log(members);

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
                }); 
            }
            else
            {
                res.send(members);
            }
        })
    });
});

module.exports = router;