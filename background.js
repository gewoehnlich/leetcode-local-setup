function checkActiveTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            for (const activeTab of tabs) {
                // const activeTab = tabs[0];
                const url = activeTab.url;

                console.log(url);

                if (url && url.includes("leetcode.com")) {
                    console.log("The active tab is on leetcode.com");
                } else {
                    console.log("The active tab is not on leetcode.com");
                }
            }
        }
    });
}

// Run when the active tab changes
chrome.tabs.onActivated.addListener(() => {
    checkActiveTab();
});

// Run when a tab is updated (e.g., navigated to a new URL)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        checkActiveTab();
    }
});

// Run initially when the popup opens
checkActiveTab();

