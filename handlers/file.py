from pathlib import Path
from bs4 import BeautifulSoup
import shutil
from handlers.soup import getSoupObject
from exceptions.exceptions import WrongConfigDataException
from typing import List
import re
import json

def createFile(filepath: str) -> str:
    soup = getSoupObject(filepath)
    title = soup.find("div", class_="text-title-large").find("a").text
    foldername, filename = getFolderAndFileNames(title)
    fileformat = getFileFormat(filepath)
    
    file = Path(f"{foldername}/{filename}{fileformat}")
    file.parent.mkdir(parents=True, exist_ok=True)

    filestring = str(file)
    if file.exists():
        moveFile(filestring)

    return filestring 


def getFolderAndFileNames(title: str) -> List[str]:
    problem_number = re.match(r'^(\d+)', title).group(1)
    
    foldername_config_value = getConfigValue("folder_names")
    filename_config_value = getConfigValue("file_names")

    if foldername_config_value == "short":
        foldername = problem_number
    elif foldername_config_value == "full":
        foldername = title

    if filename_config_value == "short":
        filename = problem_number
    elif filename_config_value == "full":
        filename = title

    return [foldername, filename]


def getConfigValue(key: str) -> str:
    config = Path("config.json")    
    if not config:
        return "full"

    with open(config, "r") as file:
        data = json.load(file)
        if not data.get(key):
            return False

        value = data.get(key)
        if value != "short" and value != "full":
            raise WrongConfigDataException
        
        return value 


def moveFile(filestring: str) -> None:
    source = Path(filestring)

    folder = source.parent
    file = source.name

    destination = Path(f"{folder}/older_files/{file}")
    destination.parent.mkdir(parents=True, exist_ok=True)

    shutil.move(str(source), str(destination))


def getFileFormat(filepath: str) -> str:
    soup = getSoupObject(filepath)
    language = soup.find("button", class_="rounded items-center whitespace-nowrap focus:outline-none inline-flex bg-transparent dark:bg-dark-transparent text-text-secondary dark:text-text-secondary active:bg-transparent dark:active:bg-dark-transparent hover:bg-fill-secondary dark:hover:bg-fill-secondary px-1.5 py-0.5 text-sm font-normal group").text

    fileformat = None
    match language:  
        case "C++":
            fileformat = ".cpp"
        case "Java":
            fileformat = ".java"
        case "Python" | "Python3":
            fileformat = ".py"
        case "C":
            fileformat = ".c"
        case "C#":
            fileformat = ".cs"
        case "JavaScript":
            fileformat = ".js"
        case "TypeScript":
            fileformat = ".ts"
        case "PHP":
            fileformat = ".php"
        case "Swift":
            fileformat = ".swift"
        case "Kotlin":
            fileformat = ".kt"
        case "Dart":
            fileformat = ".dart"
        case "Go":
            fileformat = ".go"
        case "Ruby":
            fileformat = ".rb"
        case "Scala":
            fileformat = ".scala"
        case "Rust":
            fileformat = ".rs"
        case "Racket":
            fileformat = ".rkt"
        case "Erlang":
            fileformat = ".erl"
        case "Elixir":
            fileformat = ".ex"
        case _:
            fileformat = None

    return fileformat
