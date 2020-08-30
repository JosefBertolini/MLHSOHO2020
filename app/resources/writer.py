import random, os

def main():
    # file = open("C:/Users/susuk/Projects/MLHSOHO2020/apps/resources/hackers.txt")
    file = open(os.path.dirname(os.path.realpath(__file__)) + "/hackers.json", 'w')
    dictionary = {"Suns Out Hacks Out" : 0, "MedHacks": 0, "First Day Back Hacks":0}
    dictionary2 = {"Suns Out Hacks Out" : 0, "MedHacks": 0, "First Day Back Hacks":0}
    first_names = {"Simon", "Ariella", "Miguel", "Magdalena", "Marjorie", "Reiko", "Milan", "Fern", "Reese", "Levi", "Hattie", "Anna", "Margaret", "Marcie", "Hannah", "Hanako", "Jace", "Rueben", "Larry", "Francisco", "Dean", "Marianna", "Anton", "Kien", "David", "Rhonda", "Sohaib", "Tasnia", "Omar", "Ray"}
    last_names = {"Horne", "Wright", "Ellison", "Chu", "Woodard", "Lloyd", "Frye", "Garner", "Drummond", "Barker", "Parra", "Prearo", "Nygaard", "Zusak", "Penderwick", "Martins", "Bir", "Sharma", "Randhawa", "Tanaka", "Ito", "Park", "Yu", "Rodriguez", "Ortiz", "Fernandez", "Rubio-Jimenes", "Carpenter",  "Boucher", "Miller"}
    languages = {"C++", "Java", "Node.js", "Python", "Ruby", "C", "C#", "HTML/CSS/JavaScript", "Go"}
    
    file.write('{ "hackers": [')

    chose_hackathon = False
    hackathon = ''
    false_count = 0
    boolean = "false"
    boolean_count = 0
    for i in range(30):
        name = first_names.pop() + " " + last_names.pop()
        chose_hackathon = False
        boolean_count += 1
        while chose_hackathon == False:
            hackathon = random.choice([ k for k in dictionary.keys()])
            if dictionary[hackathon] < 10:
                chose_hackathon = True
                dictionary[hackathon] = dictionary[hackathon] + 1
        if dictionary2[hackathon] < 6:
            boolean = "false"
            dictionary2[hackathon] = dictionary2[hackathon] + 1
        else:
            boolean = "true"
        fav_language = random.choice([k for k in languages])
        file.write('{ "name": "' + name + '", "hackathon": "' + hackathon + '", "has_team": "' + boolean + '", "favorite_languages": "' + fav_language + '" }')
        if i < 29:
            file.write(',')
        file.write('\n')
    file.write("]}")
    file.close()
    print("Finished")
if __name__ == '__main__':
    main()