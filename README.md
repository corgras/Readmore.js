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
A smooth and responsive plugin in pure JavaScript for collapsing and expanding long text blocks. The "Read more" and "Close" buttons allow you to hide or show additional content, enhancing readability and saving space on the page. Perfect for mobile devices and convenient management of large amounts of text.
<br><br>

**NOTE:**

 - The script does not depend on external libraries (such as jQuery).  
 - Content displayed with Readmore.js is fully accessible to search engines from the start, as the HTML structure remains unchanged.
<br><br>

## Install NPM

The recommended installation method is NPM. Install the latest version by the following command:

```
$ npm install readmore-javascript
```
<br>

Then include it in your HTML:

```html
<script src="/node_modules/readmore-javascript/dist/readmore.js"></script>
```
<br>

## Install CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@corgras/readmore-js@1.0.0/readmore.min.js"></script>
```
or
```html
<script src="https://unpkg.com/@corgras/readmore-js@1.0.0/readmore.min.js"></script>
```
<br>

## Install Hosting Files

Download a zip of the latest release. [Download](https://github.com/corgras/Readmore.js/releases/latest)

Go to the `dist/` directory, and import the `readmore.min.js` file by the `<script>` tag:

```html
<script src="readmore.min.js"></script>
```
<br>

## Usage

**Initialization without additional parameters:**

```javascript
document.addEventListener('DOMContentLoaded', function () {
    initReadMore('.read-more');
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
		moreLink: '<a href="#">Read More</a>',
		lessLink: '<a href="#">Close</a>'
	});
});
```
<br>

**Initialization with additional parameters for specific screen width (e.g., 768px):**

```javascript
document.addEventListener('DOMContentLoaded', function () {
	initReadMore('.readmore', {
		collapsedHeight: 200,
		speed: 100,
		heightMargin: 16,
		moreLink: '<a href="#">Read More</a>',
		lessLink: '<a href="#">Close</a>'
	}, 768);
});
```
<br>

## Options

* `speed: 100` Defines the animation speed for changing the element's height (in milliseconds).
* `collapsedHeight: 200` Sets the initial height of the content in a collapsed state (in pixels).
* `heightMargin: 16` Additional height margin to ensure space when expanding the content (in pixels).
* `moreLink: '<a href="#">Read more</a>'` HTML content of the link or button displayed to expand hidden content.
* `lessLink: '<a href="#">Close</a>'` HTML content of the link or button displayed to collapse the content after expanding it.
* `maxWidth` Sets the maximum screen width in pixels at which the plugin will be activated. If the screen width exceeds this value, the plugin will not activate, and the "Read More" button will not display.
<br><br>
## Browser Support

 - **Google Chrome:** 💻 7.0+ | 📱 90+

 - **Internet Explorer:** 💻 9.0+

 - **Microsoft Edge:** 💻 Edge | 📱 Edge 90+

 - **Mozilla Firefox:** 💻 4.0+ | 📱 89+

 - **Safari:** 💻 5.1.4+ | 📱 14+

 - **Opera:** 💻 12.0+ | 📱 76+
<br><br>
## Donation

Readmore.js is an open source project licensed under the MIT license. It's completely free to use. However, it would be great if you buy me a cup of coffee once in a while to keep me awake :)

<a href="https://www.paypal.com/donate/?hosted_button_id=DMETJT5YE55HN">
<img alt="Static Badge" src="https://img.shields.io/badge/Donate-PayPal?style=for-the-badge&logo=paypal&label=PayPal&color=blue">
</a>
