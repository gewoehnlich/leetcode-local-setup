from handlers.soup import getSoupObject

def getCodeTemplate(filepath: str) -> None:
    soup = getSoupObject(filepath)
    data = soup.find("div", class_="view-lines monaco-mouse-cursor-text").find_all("div")

    template = ""
    for line in data:
        line = line.find("span")
        for word in line:
            template += word.text

        template += "\n"

    return template

