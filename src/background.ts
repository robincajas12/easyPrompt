console.log("Background script loaded.");

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command received: ${command}`);

  if (command === 'execute-prompt') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        console.log(`Sending message to tab ${tabs[0].id}`);
        chrome.tabs.sendMessage(tabs[0].id, { action: 'execute-prompt' }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn("Could not send message, probably the content script isn't loaded on this page yet.");
          }
        });
      }
    });
  }
});
