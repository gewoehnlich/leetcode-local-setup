#!/usr/bin/env python3
from typing import List
from pathlib import Path

def createFiles(problem_number: str, file_formats: List[str]):
    for file_format in file_formats:
        file_path = Path(f"{problem_number}/{problem_number}.{file_format}")

        file_path.parent.mkdir(parents=True, exist_ok=True)

        if file_path.exists():
            response = input(
                f"Seems like the {file_path} file already exists!\n" + 
                "Do you want to rewrite the file with a clear template?\n(Y/n) "
            )

            if response.lower() != 'y':
                continue

        writeTemplate(file_path, file_format)


def writeTemplate(file_path: str, file_format: str):
    with open(file_path, 'w') as file:
        file.write("test")

