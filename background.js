// Event listener for extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('LinkedIn Profile Picture Changer extension installed.');
});

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message action is to reload and inject content script
    if (message.action === 'reloadAndInject') {
        // Query for active tabs in the current window
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // Ensure there is at least one active tab
            if (tabs.length > 0) {
                // Get the details of the active tab
                const activeTab = tabs[0];
                // Execute content script on the active tab
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    files: ['contentScript.js']
                }, () => {
                    // Reload the active tab after injecting the content script
                    chrome.tabs.reload(activeTab.id);
                });
            }
        });
    }
});