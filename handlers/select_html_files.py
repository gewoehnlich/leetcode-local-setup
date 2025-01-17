import tkinter as tk
from tkinter import filedialog
from exceptions.exceptions import NoFilesSelectedException

def getHTMLFiles():
    root = tk.Tk()
    root.withdraw()

    file_paths = filedialog.askopenfilenames(
        title="Select files",
        filetypes=[("HTML files", "*.html")]
    )

    if not file_paths:
        raise NoFilesSelectedException

    return file_paths

