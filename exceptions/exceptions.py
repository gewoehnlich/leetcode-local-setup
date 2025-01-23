class NoFilesSelectedException(Exception):
    def __init__(self):
        error_message = ( 
            "You have to select at least one HTML file!"
        )

        super().__init__(error_message)


class ParseException(Exception):
    def __init__(self):
        error_message = (
            "Something went wrong while parsing the file!"
        )

        super().__init__(error_message)


class WrongConfigDataException(Exception):
    def __init__(self):
        error_message = (
            "Your config.json file is configured wrong!\n" +
            "If you want your file names to contain the leetcode problem number and its title, then you need to specify \"full\"" +
            "If you want your file names to contain only the number, then specify \"short\""
        )

        super().__init__(error_message)

