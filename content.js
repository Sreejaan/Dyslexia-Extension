chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateStyles") {
    applyStyles();
  }
});

function applyStyles() {
  chrome.storage.sync.get(['enabled', 'fontSize', 'letterSpacing', 'bgColor', 'selectedFont'], function(settings) {
    if (settings.enabled) {
      let fontFile = settings.selectedFont || 'OpenDyslexic-Regular.otf';
      let fontUrl = chrome.runtime.getURL('fonts/' + fontFile);
      console.log("Font file:", fontFile);
      console.log("Font URL:", fontUrl);
      let style = `
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('${fontUrl}') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        * {
          font-family: 'OpenDyslexic', sans-serif !important;
          font-size: ${settings.fontSize || '16'}px !important;
          letter-spacing: ${settings.letterSpacing || '0'}px !important;
        }
        body {
          background-color: ${settings.bgColor || 'white'} !important;
        }
      `;
      let styleElement = document.querySelector('#dyslexia-styles');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'dyslexia-styles';
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = style;
    } else {
      let styleElement = document.querySelector('#dyslexia-styles');
      if (styleElement) {
        styleElement.remove();
      }
    }
  });
}

// Apply styles on page load
applyStyles();