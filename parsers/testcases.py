import re
import ast
from typing import List, Dict
from handlers.soup import getSoupObject

def getTestcases(filepath: str) -> List[Dict[str]]:
    soup = getSoupObject(filepath)

    testcases = []
    for ex in data:
        testcase = parse(ex.text)
        testcases.append(testcase)

    print(testcases)
    return testcases


def parse(text: str) -> Dict[str]:
    if re.search( # check for whether the text start with input or output
    input_section = re.search(r"Input:\s*(.*)", input_str)
    if not input_section:
        raise ValueError("No 'Input:' section found in the string.")

    ex_str = re.split(r",\s*(?![^[]*\])", input_section.group(1))

    testcase = {}
    for var in variables:
        name, value = map(str.strip, var.split("=", 1))
        testcase[name] = parsed_value

    return testcase

