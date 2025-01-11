class NoFilenameException(Exception):
    def __init__(self):
        error_message = ( 
            "You need to provide a leetcode problem number in the first parameter!\n" + 
            "All parameters that are passed after the first one gonna be interpreted as file formats.\n" + 
            "Example: ./env.py 123 py cpp c"
        )
        super().__init__(error_message)
