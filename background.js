chrome.commands.onCommand.addListener((command) => {
  console.log("Command received:", command);
  if (command === "read_selected_text") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("Active tab ID:", tabs[0].id);
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const selectedText = window.getSelection().toString().trim();
          console.log("Selected text:", selectedText);
          if (selectedText) {
            try {
              const utterance = new SpeechSynthesisUtterance(selectedText);
              // Add error handling for speech synthesis
              utterance.onerror = (event) => {
                console.error("Speech synthesis error:", event.error);
                alert("Failed to read text: " + event.error);
              };
              // Ensure a default voice is selected
              speechSynthesis.onvoiceschanged = () => {
                utterance.voice = speechSynthesis.getVoices().find(voice => voice.default) || speechSynthesis.getVoices()[0];
                speechSynthesis.speak(utterance);
              };
              // Trigger voiceschanged event if voices are not yet loaded
              if (speechSynthesis.getVoices().length > 0) {
                utterance.voice = speechSynthesis.getVoices().find(voice => voice.default) || speechSynthesis.getVoices()[0];
                speechSynthesis.speak(utterance);
              }
            } catch (error) {
              console.error("Speech synthesis failed:", error);
              alert("Speech synthesis failed: " + error.message);
            }
          } else {
            alert("Please select some text first.");
          }
        }
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error("Script execution error:", chrome.runtime.lastError);
          alert("Error executing script: " + chrome.runtime.lastError.message);
        }
      });
    });
  }
});