from pathlib import Path
from bs4 import BeautifulSoup
from parsers.template import parseTemplate
from parsers.testcases import parseTestcases


def parseHTML():
    file_path = Path("files/Two Sum - LeetCode.html")
    with file_path.open("r", encoding="utf-8") as file:
        content = file.read()

    soup = BeautifulSoup(content, "lxml")

    templateData = soup.find(class_="view-lines monaco-mouse-cursor-text").find_all("div")
    template = parseTemplate()

    testcasesData = soup.find(class_="elfjS").find_all("pre")
    testcases = parseTestcases(examplesData)

    return template, testcases

