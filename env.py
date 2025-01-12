#!/usr/bin/env python3
import sys
from handlers.init import setVariables
from handlers.files import createFiles 


if __name__ == '__main__':
    problem_number, file_formats = setVariables(sys.argv)
    createFiles(problem_number, file_formats)

