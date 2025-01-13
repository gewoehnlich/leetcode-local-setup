import re
import ast

def parseExamples(input_str: str) -> dict:
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

