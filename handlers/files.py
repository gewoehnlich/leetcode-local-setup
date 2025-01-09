#!/usr/bin/env python3
import os
from typing import List

# rewrite everything to Path() from pathlib

def makeDirectoryAndFiles(problem_number: str, file_formats: List[str]):
    folder_name = problem_number
    createFolder(folder_name)
    createFiles(folder_name, problem_number, file_formats)

def createFolder(folder_name: str):
    if os.path.exists(folder_name):
        return

    os.makedirs(folder_name)

def createFiles(folder_name: str, problem_number: str, file_formats: List[str]):
    path = folder_name + '/' + problem_number + '.'
    for file_format in file_formats:
        file_path = path + file_format
        if os.path.exists(file_path):
            response = input(
                f"Seems like the {file_path} file already exists!\n" + 
                "Do you want to rewrite the file with a clear template?\n" + "(Y/n) "
            )

            if response != 'Y':
                continue

        writeTemplate(file_path, file_format)

def writeTemplate(file_path: str, file_format: str):
    with open(file_path, 'w') as file:
        file.write("test")

