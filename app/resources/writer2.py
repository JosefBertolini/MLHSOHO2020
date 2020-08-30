import json, os, random

def main():
    file = open(os.path.dirname(os.path.realpath(__file__)) + "/teams.json", 'w')
    hackers = open(os.path.dirname(os.path.realpath(__file__)) + "/hackers.json", "r")

    hackers = json.loads(hackers.read())
    
    SOHO_teams = [[]]
    FDBH_teams = [[]]
    MedH_teams = [[]]

    for hacker in hackers["hackers"]:
        if hacker["has_team"] == 'true':
            hackathon_list = [[]]

            if (hacker["hackathon"] == "Suns Out Hacks Out"):
                # nonlocal hackathon_list
                hackathon_list = SOHO_teams
            elif (hacker["hackathon"] == "First Day Back Hacks"):
                # nonlocal hackathon_list
                hackathon_list = FDBH_teams
            else:
                # nonlocal hackathon_list
                hackathon_list = MedH_teams
            
            for team in hackathon_list:
                if len(team) < random.randint(2, 3):
                    team.append(hacker)
                    break
                else:
                    hackathon_list.append([])

    soho_team_str = str(SOHO_teams)
    fdbh_team_str = str(FDBH_teams)
    medh_team_str = str(MedH_teams)

    soho_team_str.replace("\'", '\"')
    fdbh_team_str.replace("\'", '\"')
    medh_team_str.replace('\"', '\"')

    file.write("{ \"SOHO teams\": " + soho_team_str + ", \"FDBH teams\": " + fdbh_team_str + ", \"MedH teams\": " + medh_team_str + "}")


if __name__ == "__main__":
    main()