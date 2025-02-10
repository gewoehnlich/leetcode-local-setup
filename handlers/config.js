
export async function saveConfig() {
    const storage = typeof browser !== "undefined" ? browser.storage : chrome.storage;
    const ids = [
        "create-folder",
        "file-name",
        "folder-name",
        "store-older-files"
    ];

    const checkboxes = ids.map((id) => document.getElementById(id));
    
    await Promise.all(
        Array.from(checkboxes).map((checkbox) => {
            storage.local.set({
                [checkbox.id]: checkbox.checked
            })
        })
    );
}


export async function restoreConfig() {
    const storage = typeof browser !== "undefined" ? browser.storage : chrome.storage;
    const checkboxes = [
        "create-folder",
        "file-name",
        "folder-name",
        "store-older-files"
    ];

    const data = await storage.local.get(checkboxes);

    await Promise.all(
        Object.entries(data).map(([key, value]) => {
            const element = document.getElementById(key);
            if (element) {
                element.checked = value;
            }
        })
    );
}

