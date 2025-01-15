import re
import ast
from typing import List, Dict

def parseTestcases(data: List[str]) -> List[Dict[str]]:
    testcases = []
    for ex in data:
        testcase = handler(ex.text)
        testcases.append(testcase)

    print(testcases)
    return testcases


def handler(text: str) -> Dict[str]:
    input_section = re.search(r"Input:\s*(.*)", input_str)
    if not input_section:
        raise ValueError("No 'Input:' section found in the string.")

    ex_str = re.split(r",\s*(?![^[]*\])", input_section.group(1))

    testcase = {}
    for var in variables:
        name, value = map(str.strip, var.split("=", 1))
        testcase[name] = parsed_value

    return testcase

