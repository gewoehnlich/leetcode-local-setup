
import { api, checkboxIDs } from "./constants.js";

export async function saveConfig() {
    const checkboxes = checkboxIDs.map(
        (id) => document.getElementById(id)
    );
    
    await Promise.all(
        Array.from(checkboxes).map((checkbox) => {
            api.storage.local.set({
                [checkbox.id]: checkbox.checked
            })
        })
    );
}

export async function restoreConfig() {
    const checkboxes = await api.storage.local.get(checkboxIDs);

    await Promise.all(
        Object.entries(checkboxes).map(([key, value]) => {
            const element = document.getElementById(key);
            if (element) {
                element.checked = value;
            }
        })
    );
}

