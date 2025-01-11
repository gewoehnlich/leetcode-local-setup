from bs4 import BeautifulSoup
from pathlib import Path
import re
import ast

def parse_input(input_str: str) -> dict:
    """
    Parses variables from a string starting with 'Input:'.
    
    Args:
        input_str (str): The input string to parse.
        
    Returns:
        dict: A dictionary containing variable names and their parsed values.
    """
    # Match everything after "Input: " and split by commas
    input_section = re.search(r"Input:\s*(.*)", input_str)
    if not input_section:
        raise ValueError("No 'Input:' section found in the string.")

    variables = re.split(r",\s*(?![^[]*\])", input_section.group(1))
    print(variables)
    parsed_variables = {}
    
    for var in variables:
        name, value = map(str.strip, var.split("=", 1))  # Split into name and value
        try:
            # Use ast.literal_eval to safely evaluate Python literals
            parsed_value = ast.literal_eval(value)
        except (ValueError, SyntaxError):
            parsed_value = value  # Leave as string if evaluation fails
        parsed_variables[name] = parsed_value
    
    return parsed_variables

file_path = Path("Two Sum - LeetCode.html")
with file_path.open("r", encoding="utf-8") as file:
    content = file.read()

soup = BeautifulSoup(content, "lxml")
examples = soup.find(class_="elfjS").find_all("pre")
for ex in examples:
    text_content = ex.text
    # input_match = re.search(r"Input:
    print(text_content)
    print(parse_input(text_content))

