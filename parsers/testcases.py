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
        div = self.soup.find("div", class_="flex h-full items-center " + 
                "justify-center text-label-4 dark:text-dark-label-4")
        if not div:
            return False
        
        return div.text == "You must run your code first"

    def parseTestResultTab(self) -> None:
        inputKeys = self.soup.find_all("div", class_="mx-3 mb-2 text-xs " + 
                "text-label-3 dark:text-dark-label-3")
        keys = []
        for key in inputKeys:
            key = re.sub(r'\s*=\s*$', '', key.text)
            keys.append(key)

        inputValues = self.soup.find("div", class_="cm-editor ͼ1 ͼ3 ͼ4 ͼ4w ͼ2z"
                ).find_all("div", class_="cm-line")
        for i in range(len(inputValues)):
            key = keys[i % len(keys)]
            if not self.dict[key]:
                self.dict[key] = []

            self.dict[key].append(inputValues[i].text)
        
        self.dict["expected"] = []
        expectedValues = self.soup.find("div", class_="cm-editor ͼ1 ͼ3 ͼ4 ͼ4y ͼ41"
                ).find_all("div", class_="cm-line")
        for value in expectedValues:
            self.dict["expected"].append(value.text)

    def parseLeftPanel(self) -> None:
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

