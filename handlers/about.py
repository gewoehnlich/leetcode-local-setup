import json

def showClarificationMessage():
    with open("config.json", "r") as file:
        data = json.load(file)
        setting = data.get("showClarificationMessage")
        if setting and setting != 'Y':
            return

    message = (
        "In order for the script to work properly " + 
        "you have to save the file as \"Single File\"\n" + 
        "1) Open the Leetcode webpage\n" +
        "2) Right click on it and choose \"Save as:\"\n" +
        "3) When saving a file make sure you selected \"Webpage, Single File\"\n" +
        "If the file is of .mhtml format, then you did everything perfectly fine!\n"
    )

    print(message)

