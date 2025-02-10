import { restoreConfig, saveConfig } from "./handlers/config.js";
import { main } from "./handlers/main.js";

document.addEventListener("DOMContentLoaded", async () => {
    await restoreConfig();
});

document.addEventListener("change", async () => {
    await saveConfig();
});

document.addEventListener("DOMContentLoaded", () => {
    const downloadButton = document.getElementById("download-file-button");
    
    if (downloadButton) {
        downloadButton.addEventListener("click", main);
    }
});

