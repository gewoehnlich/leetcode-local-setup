# leetcode-local-setup

## !!! NOT FINISHED YET !!!

### what should i do?

i take the leetcode webpage and parse data from it
there should be a test to see whether current webpage is leetcode or not

problem data is located in props
the code for the problem is in div#editor
testcases are either in session storage or i take default ones from props

there is no way to tell what language does a user writing in
besides checking the div#editor button textContent, which is unstable
but there is no way to check it otherwise

i take the fileformat, and use that data to check what fileformat for a file should i use
and take necessary headers to make the file work
and also it's needed to process the testcases

    1 /
    2 ├── app/
    3 │   ├── background/
    4 │   │   └── index.js
    5 │   ├── content_scripts/
    6 │   │   └── leetcode.js
    7 │   └── popup/
    8 │       ├── popup.html
    9 │       ├── popup.js

10 │ └── style.css
11 │
12 ├── src/
13 │ ├── Containers/
14 │ │ └── ProblemDownloader/
15 │ │ ├── Actions/
16 │ │ │ └── DownloadProblemFileAction.js
17 │ │ ├── Tasks/
18 │ │ │ ├── ParseLeetCodePageTask.js
19 │ │ │ ├── GenerateFileContentTask.js
20 │ │ │ └── TriggerDownloadTask.js
21 │ │ ├── Data/
22 │ │ │ └── DTOs/
23 │ │ │ └── ProblemData.js
24 │ │ └── Templates/
25 │ │ ├── leetcode_headers_c.h
26 │ │ ├── leetcode_headers_cpp.h
27 │ │ └── leetcode_headers.py
28 │ │
29 │ └── Ship/
30 │ ├── Exceptions/
31 │ │ └── ApiError.js
32 │ ├── Helpers/
33 │ │ └── FileSaver.js
34 │ └── Configs/
35 │ └── main.js
36 │
37 ├── assets/
38 │ └── leetcode.png
39 │
40 ├── .env
41 ├── .gitignore
42 ├── manifest.json
43 ├── README.md
44 └── package.json

Explanation of the Structure:

- `app/`: This is the entry point of your extension, containing all the code related to the browser interface.
  - popup/: Holds the UI for your extension's popup.
  - content_scripts/: For scripts that will be injected directly into leetcode.com to scrape problem data.
  - background/: For the background service worker/script.

- `src/`: This directory contains the core logic of your application, completely decoupled from the extension's UI.
  - `Containers/`: Holds the different business logic features of your application. I've created a ProblemDownloader
    container as an example.
    - Actions: The main entry point for a container's functionality. An action orchestrates multiple tasks to
      achieve a use case (e.g., "download the problem file").
    - Tasks: Smaller, single-responsibility pieces of logic that can be reused across actions (e.g., "parsing the
      page", "generating the file").
    - Data/DTOs: Data Transfer Objects to standardize the structure of data, like the problem information scraped
      from the page.
    - Templates: Your existing file templates would live here, inside the container that uses them.
  - `Ship/`: Contains shared, low-level code that can be used by any container.
    - Exceptions/: Custom error classes.
    - Helpers/: General utility functions (e.g., a helper to save files).
    - Configs/: For application-wide configuration.

- `assets/`: For static assets like images and icons.

How your current files would map:

- popup.html, style.css, script.js -> app/popup/
- handlers/parser.js -> src/Containers/ProblemDownloader/Tasks/ParseLeetCodePageTask.js
- handlers/file.js -> src/Containers/ProblemDownloader/Tasks/GenerateFileContentTask.js
- handlers/main.js -> The logic would be split. The UI part in app/popup/popup.js and the core logic in
  src/Containers/ProblemDownloader/Actions/DownloadProblemFileAction.js.
- errors/\*.js -> src/Ship/Exceptions/
- templates/\* -> src/Containers/ProblemDownloader/Templates/
- leetcode.png -> assets/
