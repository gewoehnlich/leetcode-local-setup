#!/usr/bin/env python3
import sys   # remove later, used for debug
from handlers.select import getHTMLFiles
from handlers.file import createFile
from parsers.template import getCodeTemplate
from parsers.testcases import getTestcases

if __name__ == '__main__':
    html_files = getHTMLFiles()
    for filepath in html_files:
        file = createFile(filepath)
        code_template = getCodeTemplate(filepath)
        testcases = getTestcases(filepath)
        sys.exit()
        compileFile(file, code_template, testcases)

