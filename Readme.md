# 🧩 Chrome Extension Manifest Explained (Manifest v3)

This document explains each section of the provided `manifest.json` and related concepts in detail.

---

## 1. **Permissions**
```json
"permissions": ["storage", "scripting", "activeTab"]
```

### 🔹 Meaning
- **storage** → Allows the extension to save and retrieve data using Chrome's storage API (like a small database).  
- **scripting** → Lets the extension programmatically inject or execute JavaScript/CSS files on web pages.  
  Example:
  ```js
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
  ```
- **activeTab** → Gives temporary access to the active tab **after a user action** (like clicking the extension icon). The extension can then access the page’s DOM, URL, and title.

---

## 2. **Content Scripts**
```json
"content_scripts": [
  {
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }
]
```

### 🔹 Meaning
- **matches** → Defines which pages the script should automatically run on (`<all_urls>` = all websites).
- **js** → Specifies which file(s) to inject (`content.js`).

### 🔹 Notes
- These scripts **run automatically** on matched pages.
- They can interact with the webpage’s DOM but **cannot directly use most Chrome APIs**. They communicate with the background script using `chrome.runtime.sendMessage()`.

---

## 3. **Action**
```json
"action": {
  "default_popup": "popup.html",
  "default_icon": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  }
}
```

### 🔹 Meaning
- **default_popup** → The HTML file that opens when the extension icon is clicked.
- **default_icon** → Icons for different Chrome contexts (not related to window size).  
  - `16` → Toolbar  
  - `48` → Extension page  
  - `128` → Chrome Web Store listing

---

## 4. **Icons**
```json
"icons": {
  "16": "icon16.png",
  "48": "icon48.png",
  "128": "icon128.png"
}
```

### 🔹 Meaning
These icons represent the **extension identity** (used in settings, extension management page, and Chrome Web Store).  
They can be the same files as used in `"action"`.

---

## 5. **Commands**
```json
"commands": {
  "read_selected_text": {
    "suggested_key": {
      "default": "Ctrl+Shift+Y"
    },
    "description": "Read selected text aloud"
  }
}
```

### 🔹 Meaning
Defines **keyboard shortcuts** (hotkeys) for extension features.

Example usage in background.js:
```js
chrome.commands.onCommand.addListener((command) => {
  if (command === "read_selected_text") {
    // Your code here
  }
});
```

---

## 6. **Background**
```json
"background": {
  "service_worker": "background.js"
}
```

### 🔹 Meaning
- Runs as a **service worker** — handles events like user actions, messages, or shortcuts.  
- Stays separate from the web page’s JS.

### 🔹 Common Tasks
- Inject scripts dynamically
- Handle `chrome.commands` and `chrome.storage`
- Communicate with `content.js` and `popup.html`

### 🔹 Difference from Content Script
| File | Runs Where | Purpose |
|------|-------------|----------|
| `content.js` | Inside webpage | Manipulates DOM, reads content |
| `background.js` | Extension background | Handles logic, events, and permissions |

---

## 7. **Web Accessible Resources**
```json
"web_accessible_resources": [
  {
    "resources": ["fonts/*"],
    "matches": ["<all_urls>"]
  }
]
```

### 🔹 Meaning
Defines which extension files can be accessed by webpages.  
Without this, resources (like fonts) are private and blocked from being used by the webpage.

### Example:
If you use a font from your extension:
```css
@font-face {
  font-family: 'OpenDyslexic';
  src: url(chrome-extension://<id>/fonts/OpenDyslexic.woff) format('woff');
}
```

Then `"web_accessible_resources"` allows Chrome to load it.

---

## 8. **Font Format Reference**

When using different font types, specify their format correctly:

| File Type | Correct `format()` value | Example |
|------------|--------------------------|----------|
| `.ttf` | `'truetype'` | `format('truetype')` |
| `.otf` | `'opentype'` | `format('opentype')` |
| `.woff` | `'woff'` | `format('woff')` |
| `.woff2` | `'woff2'` | `format('woff2')` |
| `.eot` | `'embedded-opentype'` | `format('embedded-opentype')` |

### Example for WOFF
```css
@font-face {
  font-family: 'OpenDyslexic';
  src: url('${fontUrl}') format('woff');
}
```

---

## 🧠 Summary Table

| Section | Meaning | Your Understanding | Correction / Addition |
|----------|----------|--------------------|------------------------|
| permissions | What access extension has | ✅ Mostly right | Clarify “scripting” and “activeTab” scope |
| content_scripts | Auto-injected page scripts | ✅ Right | Runs automatically, limited Chrome API access |
| action | Defines popup & icon | ✅ Right | Icons for contexts, not screen resize |
| icons | Extension identity icons | ⚠️ Partial | Used in settings/store, not toolbar |
| commands | Keyboard shortcuts | ❌ Missing | Define hotkeys for extension features |
| background | Event handler/service worker | ⚠️ Partial | Separate from content.js; handles events |
| web_accessible_resources | Publicly shareable files | ⚠️ Partial | Required for injecting custom fonts, etc. |

---

## 🚀 Suggested Next Step
Would you like a **flow diagram** explaining how these parts communicate (popup → background → content → webpage)?  
It’ll make the entire extension logic crystal clear.
