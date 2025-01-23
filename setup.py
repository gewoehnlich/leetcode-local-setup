#!/usr/bin/env python3
from handlers.select import getHTMLFiles
from handlers.file import createFile
from parsers.template import getCodeTemplate
from parsers.testcases import getTestcases
from handlers.compile import compileFile


if __name__ == '__main__':
    html_files = getHTMLFiles()
    for filepath in html_files:
        file = createFile(filepath)
        code = getCodeTemplate(filepath)
        testcases = getTestcases(filepath)
        compileFile(file, code, testcases)

