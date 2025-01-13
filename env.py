#!/usr/bin/env python3
import sys
from handlers.init import setVariables
from handlers.files import createFiles 
from handlers.parser import parseFile

if __name__ == '__main__':
    # problem_number, file_formats = setVariables(sys.argv)
    # createFiles(problem_number, file_formats)
    parseFile();

