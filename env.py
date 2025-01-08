#!/usr/bin/env python3
import sys
from handlers.init import setVariables

if __name__ == '__main__':
    problem_number, file_formats = setVariables(sys.argv)
    print(f"Problem number: {problem_number}")
    print(f"File formats: {file_formats}")

