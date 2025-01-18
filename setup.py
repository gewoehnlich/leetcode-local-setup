#!/usr/bin/env python3
import sys   # remove later, used for debug
from handlers.select import getHTMLFiles
from handlers.file import createFile

if __name__ == '__main__':
    html_files = getHTMLFiles()
    for filepath in html_files:
        file = createFile(filepath)
        sys.exit()
        code_template = getCodeTemplate(html)
        testcases = getTestcases(html)
        compileFile(file, code_template, testcases)

