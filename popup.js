// Add event listener for the button with the ID 'changeButton'
document.getElementById('changeButton').addEventListener('click', () => {
    // Retrieve the value of the input field with the ID 'imageUrl'
    const imageUrl = document.getElementById('imageUrl').value;
    // Check if the input field is not empty
    if (imageUrl) {
        // Save the image URL to local storage
        chrome.storage.local.set({ newImageUrl: imageUrl }, () => {
            // Query for active tabs in the current window
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                // Ensure there is at least one active tab
                if (tabs.length > 0) {
                    // Get the details of the active tab
                    const activeTab = tabs[0];
                    // Send a message to the background script to reload and inject content script
                    chrome.runtime.sendMessage({ action: 'reloadAndInject' });
                }
            });
        });
    }
});

// Add event listener for the reset button
document.getElementById('resetButton').addEventListener('click', () => {
    chrome.storage.local.set({ newImageUrl: null }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const activeTab = tabs[0];
                chrome.runtime.sendMessage({ action: 'reloadAndInject' });
            }
        });
    });
});
