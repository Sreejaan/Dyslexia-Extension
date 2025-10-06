# Dyslexia Helper Chrome Extension

## Overview

Dyslexia Helper is a Chrome extension designed to make reading online content easier for users with dyslexia. It allows users to change fonts, font sizes, letter spacing, background color, and even read selected text aloud using text-to-speech.

### Features

* Change text to dyslexia-friendly fonts (OpenDyslexic).
* Adjust font size and letter spacing.
* Customize background color.
* Read selected text aloud using a keyboard shortcut (Ctrl + Shift + Y).
* Save user preferences using Chrome Storage.

## Installation

Follow these steps to install the extension locally:

1. **Clone the repository:**

```bash
git clone <your-repo-url>
```

2. **Open Chrome Extensions Page:**

   * Go to `chrome://extensions/`

3. **Enable Developer Mode:**

   * Toggle the `Developer mode` switch on the top-right corner.

4. **Load Unpacked Extension:**

   * Click `Load unpacked`
   * Select the folder where you cloned the repository.

5. **Test the Extension:**

   * Click on the Dyslexia Helper icon in the Chrome toolbar.
   * Configure your preferences (font, font size, spacing, background color).
   * Select some text on any webpage and press `Ctrl + Shift + Y` to read it aloud.

## Demo Images

*Add your demo images here*:

![Demo 1](path/to/demo1.png)

![Demo 2](path/to/demo2.png)

## Usage

1. Click on the Dyslexia Helper icon.
2. Adjust the font, size, spacing, and background color according to your preference.
3. Enable/disable the extension using the checkbox.
4. Save your preferences.
5. Use `Ctrl + Shift + Y` to read selected text aloud.

## Key Files

* `manifest.json` - Defines extension metadata and permissions.
* `popup.html` & `popup.js` - Handles user interface and settings.
* `content.js` - Applies styles dynamically to webpages.
* `background.js` - Handles keyboard shortcut and text-to-speech.
* `fonts/` - Contains dyslexia-friendly fonts.

## License

*Specify your license here*
