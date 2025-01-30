chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
        const activeTab = tabs[0];
        const url = activeTab.url;

        if (url && url.includes("leetcode.com/problems")) {
            console.log("The active tab is on leetcode.com");
        } else {
            console.log("The active tab is not on leetcode.com");
        }
    }
});

