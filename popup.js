document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['enabled', 'fontSize', 'letterSpacing', 'bgColor', 'selectedFont'], function(settings) {
    document.getElementById('enabled').checked = settings.enabled !== false;
    document.getElementById('fontSize').value = settings.fontSize || 16;
    document.getElementById('fontSizeValue').textContent = settings.fontSizeValue || 16;
    document.getElementById('letterSpacing').value = settings.letterSpacing || 0;
    document.getElementById('letterSpacingValue').textContent = settings.letterSpacing || 0;
    document.getElementById('bgColor').value = settings.bgColor || '#ffffff';
    document.getElementById('font').value = settings.selectedFont || 'OpenDyslexic-Regular.otf';
  });

  document.getElementById('fontSize').addEventListener('input', function() {
    document.getElementById('fontSizeValue').textContent = this.value;
  });
  document.getElementById('letterSpacing').addEventListener('input', function() {
    document.getElementById('letterSpacingValue').textContent = this.value;
  });

  document.getElementById('save').addEventListener('click', function() {
    let enabled = document.getElementById('enabled').checked;
    let fontSize = document.getElementById('fontSize').value;
    let letterSpacing = document.getElementById('letterSpacing').value;
    let bgColor = document.getElementById('bgColor').value;
    let selectedFont = document.getElementById('font').value;

    chrome.storage.sync.set({enabled: enabled, fontSize: fontSize, letterSpacing: letterSpacing, bgColor: bgColor, selectedFont:selectedFont}, function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "updateStyles"});
      });
    });
  });
});