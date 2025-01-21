import re
from typing import List, Dict
from handlers.soup import getSoupObject
from exceptions.exceptions import ParseException

def getTestcases(filepath: str) -> Dict[str, List[str]]:
    amount = getAmount(filepath)
    variables = getVariables(filepath)
    values = getValues(filepath)

    testcases = handleTestcases(amount, variables, values)

    return testcases


def getAmount(filepath: str) -> int:
    soup = getSoupObject(filepath)
    divs = soup.find("div", class_="flex flex-wrap items-center gap-x-2 gap-y-4").find_all("button")

    amount = len(divs) - 1
    return amount 


def getVariables(filepath: str) -> List[str]:
    soup = getSoupObject(filepath)
    divs = soup.find_all("div", class_="text-xs font-medium text-label-3 dark:text-dark-label-3")

    variables = []
    for div in divs:
        text = div.text
        variable = re.sub(r" =\s*$", "", text)
        variables.append(variable)

    return variables


def getValues(filepath: str) -> List[str]:
    soup = getSoupObject(filepath)
    divs = soup.find_all("div", class_="cm-line")

    values = []
    for div in divs:
        value = div.text
        values.append(value)

    return values


def handleTestcases(amount: int, variables: List[str], values: List[str]) -> Dict[str, List[str]]:
    if (amount * len(variables) != len(values)):
        raise ParseException


    testcases = dict()
    for variable in variables:
        testcases[variable] = list()

    for i in range(len(values)):
        testcases[variables[i % len(variables)]].append(values[i])

    return testcases

