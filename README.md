<div align="center">
<a href="https://github.com/corgras/Readmore.js">
<img src="https://corgras.github.io/assets/images/logo.svg" alt="CORGRAS" width="80" height="80">
</a>
<h1 align="center">Readmore.js<br>A simple and effective solution in pure JS.</h1>
</div>
<br>
<div align="center">
<img alt="GitHub Release" src="https://img.shields.io/github/v/release/corgras/readmore.js?style=for-the-badge">
<img alt="Language Javascript" src="https://img.shields.io/badge/language-Javascript-yellow?style=for-the-badge">
<img alt="GitHub License" src="https://img.shields.io/github/license/corgras/readmore.js?style=for-the-badge">
<a href="https://www.paypal.com/donate/?hosted_button_id=DMETJT5YE55HN"><img alt="Donate" src="https://img.shields.io/badge/Donate-PayPal?style=for-the-badge&logo=paypal&label=PayPal&color=blue"></a>
</div>
<br>
ReadMore.js is a lightweight and flexible JavaScript plugin for creating user-friendly expandable text blocks with "Read More" and "Hide" buttons. It optimizes the display of large amounts of content, improving readability and saving space on the page. The plugin is ideal for websites, blogs, news portals, and other projects where managing long texts on desktops and mobile devices is necessary.
<br><br>

**NOTE:**

 - The plugin works standalone, requiring no third-party libraries such as jQuery..  
 - All content remains accessible to search engines, as the plugin does not alter the HTML structure of the page.
<br><br>

**DOCUMENTATION DETAILED:**

<a href="https://corgras.github.io/en/readmore/docs/">
<img alt="Documentation" src="https://img.shields.io/badge/documentation%20detailed-b?style=for-the-badge&logo=googledocs&logoColor=white&logoSize=20px&labelColor=%23555&color=blue"></a>
<br><br>

## Install NPM

This method is ideal for projects using the npm package manager. Installing via NPM simplifies dependency management, library updates, and integration with modern JavaScript frameworks such as React, Vue.js, or Angular.

- Run the following command in your terminal:

```bash
$ npm i @corgras/readmore-js
```

- After installation, include the script in your project. For example, add it to your HTML file:

```html
<script src="./node_modules/@corgras/readmore-js/readmore.min.js"></script>
```

- If you are using a module system, import the library in your JavaScript code (see sections below)
<br>
<br>

## Install CDN

Using a CDN (Content Delivery Network) allows you to quickly include Readmore.js without locally storing files. CDNs provide fast loading speeds due to caching and a global server network.

- Add one of the following scripts to the `<head>` section or before the closing `</body>` tag:

CDN jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/@corgras/readmore-js/readmore.min.js"></script>
```
<br>

CDN Unpkg:

```html
<script src="https://unpkg.com/@corgras/readmore-js/readmore.min.js"></script>
```
<br>
<br>

## Install Node.js/CommonJS

For projects using CommonJS (e.g., in Node.js or with tools like Webpack), you can import the main Readmore.js function after installing via NPM.

- Add the following code to your JavaScript file:

```javascript
const initReadMore = require('@corgras/readmore-js');
// Initialization: initReadMore('.selector', { /* options */ });
```

- Ensure your project is configured to work with CommonJS modules.
<br>
<br>

## Install ES Modules

For modern projects using ES modules (e.g., with Vite, Rollup, or modern versions of Webpack), import Readmore.js as a module after installing via NPM:

- Add the following code to your JavaScript file:

```javascript
import initReadMore from '@corgras/readmore-js';
// Initialization: initReadMore('.selector', { /* options */ });
```

- Ensure your HTML file includes the `type="module"` attribute in the `<script>` tag if you are including the script directly.

- Example of including with module type:

```html
<script type="module">
	import initReadMore from './node_modules/@corgras/readmore-js/readmore.min.js';
	initReadMore('.content', { collapsedHeight: 200 });
</script>
```
<br>
<br>


## Install Manually

If you are not using package managers, you can include Readmore.js by manually downloading the script file. This method gives you full control over the library version and does not rely on external tools.

- Download a zip of the latest release. 

<a href="https://github.com/corgras/Readmore.js/releases/latest"><img alt="Download" src="https://img.shields.io/badge/download-b?style=for-the-badge&color=blue"></a>

- Place the downloaded file in your project folder (e.g., `/js/`).

- Include the script in your HTML file by adding the following code in the `<head>` section or before the closing `</body>` tag:

```html
<script src="path_to_your_folder/readmore.min.js" defer></script>
```

- After inclusion, initialize the script by calling the `initReadMore` function.
<br>
<br>

## Usage

The Readmore.js plugin allows you to create a «Read More» functionality for any elements with textual content, such as `<div>`, `<p>`, `<section>`, or `<article>`. The script trims the content to a specified height and adds a button to expand/collapse the text.
For initialization, use a CSS selector, such as the class `.readmore`, which should be added to the target elements. Ensure the element contains enough content so that its height exceeds the `collapsedHeight` parameter; otherwise, the button will not appear.

```html
<div class="readmore">
	<p>Long content here...</p>
</div>
```
<br>

**Initialization without additional parameters:**

```javascript
document.addEventListener('DOMContentLoaded', function () {
    initReadMore('.readmore');
});
```
<br>

**Initialization with Parameters:**

```javascript
document.addEventListener('DOMContentLoaded', function () {
	initReadMore('.readmore', {
		collapsedHeight: 200, // Height of the collapsed block in pixels
		speed: 400,          // Animation duration in milliseconds
		moreLink: '<span>Read More</span>', // Text for the expand button
		lessLink: '<span>Collapse</span>'   // Text for the collapse button
	});
});
```
<br>

**Initialization with Responsive Settings:**

```javascript
document.addEventListener('DOMContentLoaded', function () {
	initReadMore('.readmore', {
		collapsedHeight: 200,
		speed: 400,
		moreLink: '<span>Read More</span>',
		lessLink: '<span>Collapse</span>',
		breakpoints: {
			576: { // For screens up to 576 pixels
				collapsedHeight: 100,
				speed: 200,
				moreLink: '<span>Details</span>',
				lessLink: '<span>Hide</span>'
			},
			768: { // For screens up to 768 pixels
				collapsedHeight: 150,
				speed: 300
			},
			1024: { // For screens up to 1024 pixels
				disableCollapse: true // Disable functionality
			}
		}
	});
});
```
<br>

**Destroying the plugin:**

```javascript
const readmore = initReadMore('.readmore');
readmore.destroy(); // Removes event listeners and resets styles
```
<br>
<br>

## Options

* `collapsedHeight: 250` Defines the initial height of collapsed content in pixels. If the content is shorter than this height, the «Read More» button is not displayed.

* `speed: 300` Sets the duration of the expand/collapse animation in milliseconds. For collapsing in `animationMode: 'js'` mode, the speed is halved.

* `moreLink: '<span>Read more</span>'` HTML string for the «Read More» button displayed in the collapsed state. Inserted into a `<button>` element. For security, HTML is sanitized of potentially dangerous attributes.

* `lessLink: '<span>Close</span>'` HTML string for the «Close» button displayed in the expanded state. Inserted into a `<button>` element. Supports sanitization of HTML from unsafe code.

* `hideButtonCollapse: true/false` If `true`, the button is hidden after expanding the content, avoiding unnecessary interface elements..

* `animationMode: 'js'` Defines the type of animation: `js` - Animation via JavaScript with smooth height transition. `css` - Animation via CSS, adds the `.cs_readmore-animation` class for styling.

* `animationType: 'ease-in-out'` Defines the timing function for JavaScript-based animation (works with `animationMode: 'js'`). Options: `'linear'`, `'ease'`, `'ease-in'`, `'ease-out'`, `'ease-in-out'`.

* `scrollToTopOnCollapse: true/false` If `true`, the page smoothly scrolls to the top of the content after collapsing, improving viewing convenience.

* `disableCollapse: true/false` If `true`, disables the collapse function for an element or screen width range, displaying the full content.

* `breakpoints: {}` Allows setting different parameter values based on screen width. Keys are the maximum screen width in pixels, values are an object with parameters. If the screen width exceeds the maximum key, collapsing is disabled.

* `beforeToggle: null` Callback invoked before expanding/collapsing starts. Receives arguments: `button` (button), `element` (content element), `isExpanded` (boolean state).

* `afterToggle: null` Callback invoked after expanding/collapsing completes. Receives the same arguments: `button`, `element`, `isExpanded`.

* `blockProcessed: null` Callback invoked after the plugin processes an element. Receives arguments: `element` (content element), `needsToggle` (boolean indicating if a button is needed).
<br><br>

## Events

Readmore.js generates two events: `readmore:beforeToggle` and `readmore:afterToggle`. These can be used to add custom logic during state transitions.

* `readmore:beforeToggle` Triggered before the element's state changes

* `readmore:afterToggle` Triggered after the element's state changes.
<br><br>

### Callbacks

The `beforeToggle` and `afterToggle` callbacks receive the following arguments: `trigger`, `element`, and `isExpanded`.

* `trigger`: The element that triggers the action (e.g., the «Read more» or «Close» button).

* `element`: The element containing the content to be expanded or collapsed.

* `isExpanded`: A value indicating the content's state: (true — expanded, false — collapsed).
<br>

The `blockProcessed` callback receives `element` and `isExpandable`.

* `element`: the block that has just been processed

* `isExpandable`: a boolean value indicating whether collapsing is needed
<br><br>

#### Callback Example:

This example demonstrates the use of callback functions to modify the button's appearance and text depending on the element's state. It shows how the button style can be changed before and after state toggling:

```javascript
initReadMore('.content', {
	beforeToggle: function(trigger, element, isExpanded) {
		// Example: Change the button background color before state change
		trigger.style.backgroundColor = isExpanded ? '#90EE90' : '#FF7F7F';
	},
	afterToggle: function(trigger, element, isExpanded) {
		// Example: Update the button text after state change
		trigger.textContent = isExpanded ? 'Hide' : 'Read more';
	},
	blockProcessed: function(element, isExpandable) {
		// Example: Add a class if the element is expandable
		if (isExpandable) {
			element.classList.add('expandable');
		}
	}
});
```
<br><br>

## CSS:

This section will help you customize the appearance and behavior of elements controlled by the Readmore.js plugin. Below is a detailed description of the CSS classes, data attributes, and ARIA attributes used in the plugin, along with recommendations for their styling. These tools enable you to create a responsive, accessible, and visually appealing interface for the «Read more»/«Collapse» functionality.

**CSS Class**

* `.cs_readmore-btn-wrapper` Container for the «Read more» or «Collapse» button. Used as a wrapper for the button to facilitate positioning and styling. Automatically hidden if the content is shorter than `collapsedHeight` or if `hideButtonCollapse: true` in the expanded state.

* `.cs_readmore-btn` Assigned to the button itself, responsible for expanding or collapsing the content. Contains HTML defined in the `moreLink` or `lessLink` parameters. Can be styled to change color, size, background, etc.

* `.cs_readmore-animation` Applied to the content element in CSS animation mode (`animationMode: 'css'`). Adds smooth transitions for changing the block's height. It is recommended to define the CSS `transition` property for this class.

* `.cs_readmore-expanded` Added to the content element in the expanded state in CSS animation mode (`animationMode: 'css'`). Allows styling the expanded state, e.g., changing the background or border. Useful for visually indicating the active state of the content.
<br>

**Data Attributes**

* `data-readmore-btn-toggle` Added to the «Read more»/«Collapse» button to track its state. Possible values: `collapsed` — button in the collapsed content state (displays `moreLink`). `expanded` — button in the expanded content state (displays `lessLink`). Can be used for conditional button styling based on its state.

* `data-readmore-block-toggle` Applied to the content element to track its state. Possible values: `collapsed` — content is collapsed (limited by `collapsedHeight`). `expanded` — content is fully expanded. Useful for creating styles specific to the block's state.

* `data-readmore-processed` Added to the content element after being processed by the plugin. Value: `true`; Used to indicate that the element has already been initialized to prevent reprocessing.
<br>

**ARIA Attributes**

* `aria-expanded` Added to the content element and button to indicate their state. Possible values: `true` — content is expanded. `false` — content is collapsed. Ensures accessibility for screen readers by indicating the element's state.

* `aria-hidden` Applied to the content element in the collapsed state. Possible values: `true` — content is hidden (collapsed, not all content is accessible). Absent — content is expanded and fully visible. Helps screen readers ignore hidden content in the collapsed state.

* `aria-controls` Added to the button to associate it with the content element. Value: unique identifier of the content element. Indicates which element is controlled by the button, improving navigation for users with assistive technologies.

* `role` Added to the content element. Value: `area`. Marks the element as an important page area for screen readers.
<br>

**Additional Notes**

JS Animation Mode: If `animationMode: 'js'`, styles for `.cs_readmore-animation` and `.cs_readmore-expanded` are not needed, as the animation is handled by JavaScript.
						
Responsiveness: Use media queries along with the `breakpoints` parameter to adjust styles for different screen sizes.

Events: The plugin triggers custom events `readmore:beforeToggle` and `readmore:afterToggle`, which can be used for dynamic style changes via JavaScript.

Style Cleanup: When the `destroy` method is called, all classes, attributes, and styles added by the plugin are removed, restoring elements to their original state.
<br>

**Example of Styling**

The code creates styles for the button container and the button itself, adding padding, text alignment, and user interaction styles, including color changes on hover.

```css
cs_readmore-btn-wrapper {
	margin: 15px auto 0;
	text-align: center;
}
.cs_readmore-btn-wrapper:before {
	border-top: 1px solid #ddd;
	content: '';
	display: block;
	width: 100%;
	z-index: -1;
	position: relative;
	transform: translateY(15px);
}
.cs_readmore-btn {
	color: #005EFF;
	background: #fff;
	border: 0;
	margin: 0;
	padding: 0 20px;
	text-align: center;
}
.cs_readmore-btn:hover {
	color: #0051DE;
}
.cs_readmore-animation {
	transition: height 300ms ease-in-out;
	overflow: hidden;
}
.cs_readmore-expanded {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.cs_readmore-btn[data-readmore-btn-toggle="expanded"] {
	background-color: #dc3545;
}
.cs_readmore-btn[data-readmore-btn-toggle="expanded"]:hover {
	background-color: #c82333;
}

/* Icons for buttons using CSS */
.cs_readmore-btn::after {
	content: '↓';
	font-size: 14px;
}
.cs_readmore-btn[data-readmore-btn-toggle="expanded"]::after {
	content: '↑';
}
```
<br><br>

## Browser Support

 - **Google Chrome:** 💻 49+ | 📱 49+

 - **Microsoft Edge:** 💻 Edge 15+ | 📱 Edge 92+

 - **Mozilla Firefox:** 💻 44+ | 📱 44+

 - **Safari:** 💻 10+ | 📱 10+

 - **Opera:** 💻 36+ | 📱 36+
<br><br>

## Donation

Readmore.js is an open source project licensed under the MIT license. It's completely free to use. However, it would be great if you buy me a cup of coffee once in a while to keep me awake :)

<a href="https://www.paypal.com/donate/?hosted_button_id=DMETJT5YE55HN">
<img alt="Donate" src="https://img.shields.io/badge/Donate-PayPal?style=for-the-badge&logo=paypal&label=PayPal&color=blue">
</a>
