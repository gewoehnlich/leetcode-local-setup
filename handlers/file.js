export async function checkIfActivePageIsLeetcode() {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                resolve(false);
            }


            const activeTab = tabs[0];
            const url = activeTab.url || "";
            
            resolve(url.includes("leetcode.com/problems"));
        });
    });
}

export async function getLeetcodePageContent() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (tabs.length === 0) {
                reject("No active tab found.");
                return;
            }

            const activeTab = tabs[0];
            const url = activeTab.url;
            
            resolve(url.includes("leetcode.com/problems"));

            const activeTabId = tabs[0].id;

            try {
                const results = await chrome.scripting.executeScript({
                    target: { tabId: activeTabId },
                    func: () => document.documentElement.outerHTML
                });

                if (!results || results.length === 0) {
                    reject("No results from script execution.");
                    return;
                }
                
                resolve(results[0].result); 
            } catch (error) {
                reject(error.message);
            }
        });
    });
}
