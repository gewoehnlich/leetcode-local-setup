from bs4 import BeautifulSoup
from pathlib import Path
from parsers.html import parseHTML
# from parsers.examples import parseExamples

def parseFile():    
    template, examples = parseHTML();

