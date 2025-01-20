from pathlib import Path
from bs4 import BeautifulSoup
import shutil
from handlers.soup import getSoupObject

def createFile(filepath: str) -> str:
    soup = getSoupObject(filepath)
    title = soup.find("div", class_="text-title-large").find("a").text

    foldername = title
    filename = title
    fileformat = getFileFormat(filepath)
    
    file = Path(f"{foldername}/{filename}{fileformat}")
    file.parent.mkdir(parents=True, exist_ok=True)

    filestring = str(file)
    if file.exists():
        moveFile(filestring)

    return filestring 


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
