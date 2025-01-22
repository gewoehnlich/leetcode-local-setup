from typing import Dict, List
from pathlib import Path
import re


def compileFile(filepath: str, code: str, testcases: str) -> None:
    path = Path(filepath)
    fileformat = re.search(r'\.\w+$', filepath).group()
    with open(Path("templates/template" + fileformat), "r") as file:
        template = file.read()
        
    with open(path, "w") as file:
        file.write(template)
        file.write(code)
        file.write(testcases)

    
    print(filepath + " is created!")

    return None

