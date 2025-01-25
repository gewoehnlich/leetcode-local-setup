import re
from typing import List, Dict
from handlers.soup import getSoupObject
from exceptions.exceptions import ParseException, LeftPanelNoMatchException

class Testcases:
    def __init__(self, filepath):
        self.soup = getSoupObject(filepath)
        self.dict = dict()
    
    def getTestcases(self) -> str:
        isTestResultTabSet = self.checkIfTestResultTabIsSet()
        if isTestResultTabSet:
            self.parseTestResultTab()
        else:
            self.parseLeftPanel()

        print(self.dict)

    def checkIfTestResultTabIsSet(self) -> bool:
        classname = "flex h-full items-center justify-center text-label-4 dark:text-dark-label-4"
        div = self.soup.find("div", classname)
        if not div:
            return False
        
        return div.text == "You must run your code first"

    def parseTestResultTab(self) -> Dict[str, List[str]]:
        print("something")

    def parseLeftPanel(self) -> Dict[str, List[str]]:
        parsedData = dict()
        examples = self.soup.find("div", class_="elfjS").find_all("pre")
        for ex in examples:
            input, output = self.parseLeftPanelExample(ex.text)
            self.updateDict(input, output)

    def parseLeftPanelExample(self, data: str) -> List[str]:
        inputString = "Input: "
        inputMatch = re.search(rf'{inputString}', data) 
        if not inputMatch:
            raise LeftPanelNoMatchException(inputString)
        
        outputString = "Output: "
        outputMatch = re.search(rf'{outputString}', data)
        if not outputMatch:
            raise LeftPanelNoMatchException(outputString)

        explanationString = "Explanation: "
        explanationMatch = re.search(rf'{explanationString}', data)

        explanationMatchBegin = len(data) - 1
        if explanationMatch:
            explanationMatchBegin = explanationMatch.start() - 1

        input = data[inputMatch.end():outputMatch.start()]
        output = data[outputMatch.end():explanationMatchBegin]

        return [input, output]

    def updateDict(self, input: str, output: str) -> None:
        data = re.split(r",\s*(?![^[]*\])", input)
        for record in data:
            name, value = map(str.strip, record.split("=", 1))
            if name not in self.dict:
                self.dict[name] = []
            
            self.dict[name].append(value)
        
        if "output" not in self.dict:
            self.dict["output"] = []

        self.dict["output"].append(output)

