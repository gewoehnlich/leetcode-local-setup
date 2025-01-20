from pathlib import Path
from bs4 import BeautifulSoup

def getSoupObject(filepath: str) -> object:
    filepath = Path(filepath)
    with filepath.open("r", encoding="utf-8") as file:
        content = file.read()

    soup = BeautifulSoup(content, "lxml")
    return soup

