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
        for (var hacker in hackerArray) {
            id = hacker;
            hacker = hackerArray[hacker];
            console.log(hacker["hackathon"]);
            if (hacker["hackathon"] == hack_name && hacker["has_team"] == "false") {
                members += "<p id=p"+id+">" + hacker["name"] + "<br>Favorite Language: " + hacker["favorite_languages"] + "<br><button type=\"button\">Invite</button>" +"</p>\n";
            }
        }
        members += '</div><div id="teams">'
        
        fs.readFile(".\\app\\resources\\teams.json", "utf-8", (errT, teams) => {
            if (err) throw err;
            var teamObj = JSON.parse(teams);

            var hack_team= "";
            switch (hack_name)
            {   
                case "Suns Out Hacks Out":
                    hack_team = "SOHO teams";
                    break;
                case "First Day Back Hacks":
                    hack_team = "FDBH teams";
                    break;
                case "MedHacks":
                    hack_team = "MedH teams";
                    break;
            }

            var teams = teamObj[hack_team];

            for (var team_num in teams)
            {
                team = teams[team_num];
                if (team.length > 0) {
                    members += '<div id="team'+team_num+'">';

                    for (var hacker in team)
                    {
                        hacker = team[hacker];
                        members += "<p>" + hacker["name"] + "<br>Favorite Language: " + hacker["favorite_languages"] + "</p>"
                    }

                    members += '</div>';
                }
            }

            members += "</div>"
            console.log(members);

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
            });
        });
    });
});

module.exports = router;