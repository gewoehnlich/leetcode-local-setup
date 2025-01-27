#!/usr/bin/env python3
from handlers.about import showClarificationMessage
from handlers.select import getHTMLFiles
from handlers.file import createFile
from parsers.template import getCodeTemplate
from parsers.testcases import Testcases 
from handlers.compile import compileFile


if __name__ == '__main__':
    showClarificationMessage()
    # html_files = getHTMLFiles()
    html_files = ["/home/gewoehnlich/Downloads/Reverse Integer - LeetCode.mhtml"]
    for filepath in html_files:
        # file = createFile(filepath)
        # code = getCodeTemplate(filepath)
        testcases = Testcases(filepath).getTestcases()
        # compileFile(file, code, testcases)

