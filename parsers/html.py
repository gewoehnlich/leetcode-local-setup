# from bs4 import BeautifulSoup
from pathlib import Path
from bs4 import BeautifulSoup
from parsers.examples import parseExamples

def parseHTML():
    file_path = Path("files/Two Sum - LeetCode.html")
    with file_path.open("r", encoding="utf-8") as file:
        content = file.read()

    soup = BeautifulSoup(content, "lxml")

    templateData = soup.find(class_="view-lines monaco-mouse-cursor-text").find_all("div")
    for temp in templateData:
        text_content = temp.text
        print(text_content)

    examplesData = soup.find(class_="elfjS").find_all("pre")
    for ex in examplesData:
        text_content = ex.text
        examples = parseExamples(text_content)
        print(examples)

    # return template, examples

