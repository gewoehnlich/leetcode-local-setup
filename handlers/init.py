#!/usr/bin/env python3
import sys
from typing import List, Tuple

def setVariables(argv: List[str]) -> Tuple[str, List[str]]:
    length = len(argv)

    if length <= 1:
        print(
            "You need to provide a leetcode problem number in the first parameter!\n" + 
            "All parameters that are passed after the first one gonna be interpreted as file formats.\n" + 
            "Example: ./env.py 123 py cpp c"
        )
        sys.exit(1)

    problem_number = argv[1]
    file_formats = ["py", "cpp", "c"]

    if length >= 3:
        temp_formats = []
        for i in range(2, length):
            if argv[i] not in file_formats:
                print(f"{argv[i]} is an unsupported file format :(\n")
                continue

            temp_formats.append(argv[i])

        file_formats = temp_formats

    return [problem_number, file_formats]


if __name__ == "__main__":
    result = setVariables(sys.argv)
    print(f"Problem number: {result[0]}")
    print(f"File formats: {result[1]}")

