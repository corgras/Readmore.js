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
</div>
<br>
A smooth and responsive plugin in pure JavaScript for collapsing and expanding long text blocks. The «Read More» or «Close» buttons allow you to hide or show additional content, enhancing readability and saving space on the page. Perfect for mobile devices and convenient management of large amounts of text.
<br><br>

**NOTE:**

 - The script does not depend on external libraries (such as jQuery).  
 - Content displayed with Readmore.js is fully accessible to search engines from the start, as the HTML structure remains unchanged.
<br><br>

**DOCUMENTATION DETAILED:**

<a href="https://corgras.github.io/en/readmore/docs/">
<img alt="Documentation" src="https://img.shields.io/badge/documentation%20detailed-b?style=for-the-badge&logo=googledocs&logoColor=white&logoSize=20px&labelColor=%23555&color=blue"></a>
<br><br>

## Install NPM

The recommended installation method is NPM. Install the latest version by the following command:

```
$ npm i @corgras/readmore-js
```
<br>

Then include it in your HTML:

```html
<script src="/node_modules/@corgras/readmore-js/readmore.min.js"></script>
```
<br>

## Install CDN

You can also include this library from CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/@corgras/readmore-js@2.0.0/readmore.min.js"></script>
```
<br>

Alternative CDNs:
```html
<script src="https://unpkg.com/@corgras/readmore-js@2.0.0/readmore.min.js"></script>
```
<br>

## Install Manually

Download a zip of the latest release. 

<a href="https://github.com/corgras/Readmore.js/releases/latest"><img alt="Download" src="https://img.shields.io/badge/download-b?style=for-the-badge&color=blue"></a>

Import the `readmore.min.js` file by the `<script>` tag:

```html
<script src="readmore.min.js"></script>
```
<br>

## Usage

**Initialization without additional parameters:**

```javascript
document.addEventListener('DOMContentLoaded', function () {
    initReadMore('.readmore');
});
```
<br>

**Initialization with additional options for all screen sizes:**

```javascript
document.addEventListener('DOMContentLoaded', function () {
	initReadMore('.readmore', {
		collapsedHeight: 200,
		speed: 100,
		heightMargin: 16,
		moreLink: '<span>Read More</span>',
		lessLink: '<span>Close</span>'
	});
});
```
<br>

**Initialization for different screen sizes:**

```javascript
document.addEventListener('DOMContentLoaded', function () {
	initReadMore('.readmore', {
		collapsedSize: 200,
		speed: 200,
		heightMargin: 16,
		moreLink: '<span>Read More</span>',
		lessLink: '<span>Close</span>',
		breakpoints: {
			576: {
				collapsedSize: 100,
				speed: 200,
				moreLink: '<span>More</span>',
				lessLink: '<span>Collapse</span>',
			},
			768: {
				collapsedSize: 150,
				speed: 250,
			},
		}
	});
});
```
<br>

## Options

* `speed: 100` Defines the speed of the height change animation (in milliseconds).
* `collapsedHeight: 200` Sets the initial content height in collapsed state (in pixels).
* `heightMargin: 16` Additional height margin to ensure space when expanding the content (in pixels).
* `moreLink: '<span>Read more</span>'` The «Read More» button text with HTML support. Used inside the <button> element, which is displayed to expand hidden content.
* `lessLink: '<span>Close</span>'` The «Close» button text with HTML support. Used inside the <button> element, which is displayed to collapse content after it has been expanded.
* `lazyLoad: true/false` When enabled, elements (content or media) will only be initialized when they appear in the viewport.
* `hideButtonCollapse: true/false` If set to true, the «Read More» button is not displayed when the entire content fits in the visible area without needing to be collapsed.
* `animationMode: 'js'` Animation mode for height change: js — use JavaScript animation; css — CSS animation is used. When this mode is activated, the class cs_readmore-animation is added to the element.
* `breakpoints: {}` Allows specifying different values for other options depending on the screen width. Keys are screen widths (in pixels), and values are objects with new option values.
<br><br>

## Events

Readmore.js generates two primary events: `readmore:beforeToggle` and `readmore:afterToggle`. These events can be listened to and used to add custom logic during the element's state transition.

* `readmore:beforeToggle` This event is triggered before the element's state changes. It allows configuring behavior before the state is modified.

* `readmore:afterToggle` This event is triggered after the element's state changes. It allows actions to be performed immediately after the state is updated.
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

You can familiarize yourself with the CSS classes and data attributes used in the Readmore.js plugin, as well as their descriptions. These classes and attributes will help you style elements and control their behavior when expanding and collapsing content.

* `.cs_readmore-btn-wrapper` Applied to the container of the button that manages the «Read More» or «Close» actions. Serves as a wrapper for the button.
* `.cs_readmore-btn` Assigned to the button that allows the user to expand or collapse the content. Manages the styles of the button itself.
* `.cs_readmore-animation` Used if the CSS animation mode `animationMode: 'css'` is enabled. Added to create animations through CSS.

* `data-readmore-btn-toggle'` Applied to the «Read More» or «Close» button. Used to track the button's state. The attribute stores the button state: `collapsed` — the button is in the collapsed state; `expanded` — the button is in the expanded state.
* `data-readmore-block-toggle` Applied to the element containing the content. Helps track the current state of the content (collapsed or expanded). The attribute manages the content block's state: `collapsed` — the block is collapsed. `expanded` — the block is expanded.
<br>
<br>
**Example of Styling**

The code creates styles for the button container and the button itself, adding padding, text alignment, and user interaction styles, including color changes on hover.

```css
.cs_readmore-btn-wrapper {
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
```
<br><br>

## Browser Support

 - **Google Chrome:** 💻 51+ | 📱 51+

 - **Microsoft Edge:** 💻 Edge 15+ | 📱 Edge 92+

 - **Mozilla Firefox:** 💻 55+ | 📱 55+

 - **Safari:** 💻 12.1+ | 📱 14+

 - **Opera:** 💻 38+ | 📱 41+
<br><br>

## Donation

Readmore.js is an open source project licensed under the MIT license. It's completely free to use. However, it would be great if you buy me a cup of coffee once in a while to keep me awake :)

<a href="https://www.paypal.com/donate/?hosted_button_id=DMETJT5YE55HN">
<img alt="Donate" src="https://img.shields.io/badge/Donate-PayPal?style=for-the-badge&logo=paypal&label=PayPal&color=blue">
</a>
