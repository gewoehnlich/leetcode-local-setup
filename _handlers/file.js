export function checkIfActivePageIsLeetcode() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            return false;
        }


        const activeTab = tabs[0];
        const urlString = activeTab.url;

        if (!urlString || !urlString.includes("leetcode.com/problems")) {
            console.log("The active tab is not on leetcode.com/problems");
            return false;
        }
       

        console.log("The active tab is on leetcode.com/problems");
        return true;
    });
}

