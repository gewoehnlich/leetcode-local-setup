#!/usr/bin/env python3
import sys
from typing import List, Tuple
from exceptions.exceptions import NoFilenameException

def setVariables(argv: List[str]) -> Tuple[str, List[str]]:
    length = len(argv)

    if length <= 1:
        raise NoFilenameException

    problem_number = validateAndConvertInteger(argv[1])
    file_formats = ["py", "cpp", "c"]

    if length >= 3:
        file_formats = handleProvidedFileFormats(argv, length) 

    return [problem_number, file_formats]


def validateAndConvertInteger(value):
    try:
        converted_value = int(value)
        return value
    except ValueError:
        raise ValueError(f"The problem number should be an integer!")


def handleProvidedFileFormats(argv: List[str], length: int) -> List[str]:
    temp_formats = []
    for i in range(2, length):
        if argv[i] not in file_formats:
            print(f"{argv[i]} is an unsupported file format :(\n")
            continue

        temp_formats.append(argv[i])

    return temp_formats

