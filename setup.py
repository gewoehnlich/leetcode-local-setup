#!/usr/bin/env python3
import sys   # remove later, used for debug
from handlers.select_html_files import getHTMLFiles

if __name__ == '__main__':
    html_files = getHTMLFiles()
    sys.exit()
    for html in html_files:
        folder = createFolder(html)
        file = createFile(folder)
        code_template = getCodeTemplate(html)
        testcases = getTestcases(html)
        compileFile(file, code_template, testcases)

