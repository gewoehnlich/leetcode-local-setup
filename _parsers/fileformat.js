export async function getFileFormat(html) {
    return new Promise((resolve) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const button = doc.querySelector("div#editor").querySelector("button");

        if (!button) {
            resolve(null);
            return;
        }

        const language = button.textContent.trim();
        let fileFormat = null;

        switch (language) {
            case "C++": fileFormat = ".cpp"; break;
            case "Java": fileFormat = ".java"; break;
            case "Python":
            case "Python3": fileFormat = ".py"; break;
            case "C": fileFormat = ".c"; break;
            case "C#": fileFormat = ".cs"; break;
            case "JavaScript": fileFormat = ".js"; break;
            case "TypeScript": fileFormat = ".ts"; break;
            case "PHP": fileFormat = ".php"; break;
            case "Swift": fileFormat = ".swift"; break;
            case "Kotlin": fileFormat = ".kt"; break;
            case "Dart": fileFormat = ".dart"; break;
            case "Go": fileFormat = ".go"; break;
            case "Ruby": fileFormat = ".rb"; break;
            case "Scala": fileFormat = ".scala"; break;
            case "Rust": fileFormat = ".rs"; break;
            case "Racket": fileFormat = ".rkt"; break;
            case "Erlang": fileFormat = ".erl"; break;
            case "Elixir": fileFormat = ".ex"; break;
            default: fileFormat = null;
        }

        console.log(fileFormat);

        resolve(fileFormat);
    });
}

