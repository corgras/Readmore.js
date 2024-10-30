![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)
![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

# Readmore.js

A smooth, responsive Vanilla JS plugin for collapsing and expanding long blocks of text with "Read more" and "Close" links.

The "Read More" script is designed to create interactive "Read More" functionality on your website. It allows you to hide and reveal long textual content in blocks so that users can see it in its entirety by clicking the "Read More" button. This script also provides adaptive behavior depending on the screen width.

Readmore.js is tested and supported on modern browser versions, except Internet Explorer 11 and lower.


## Install

Install Readmore.js with npm:

```
$ npm install readmore-javascript
```

Then include it in your HTML:

```html
<script src="/readmore/readmore.min.js"></script>
```


## Use

```javascript
initReadMore('.readmore');
```
Call the `initReadMore()` function to initialize the script. This function takes three arguments:
				
* `selector` - Selector that selects blocks with text content.
* `options` - Script settings (e.g., `collapsedHeight`, `speed`, `heightMargin`, `moreLink`, `lessLink`).
* `maxWidth` - Maximum screen width at which the script is active (default is `null` for all screen sizes).


Example usage for all screen sizes:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  initReadMore('.readmore', {
    collapsedHeight: 100,
    speed: 200,
    heightMargin: 16,
    moreLink: '<a href="#">Read More</a>',
    lessLink: '<a href="#">Close</a>'
  });
});
```

Example usage for a specific screen width (eg 768px):

```javascript
document.addEventListener('DOMContentLoaded', function () {
  initReadMore('.readmore', {
    collapsedHeight: 100,
    speed: 200,
    heightMargin: 16,
    moreLink: '<a href="#">Read More</a>',
    lessLink: '<a href="#">Close</a>'
  }, 768);
});
```

### The options:

* `speed: 100` - in milliseconds</li>
* `collapsedHeight: 200` - in pixels</li>
* `heightMargin: 16` - in pixels, avoids collapsing blocks that are only slightly larger than `collapsedHeight`
* `moreLink: '<a href="#">Read more</a>'`
* `lessLink: '<a href="#">Close</a>'`
* `768` - optional maximum screen width value

If the text block was shorter than the specified minimum collapsed height value, the block will not have a "Read more" link.


## CSS:

If desired, style the "Read More" and "Show Less" buttons using CSS to match your design.
```css
/* Styling the "Read more" button */
.readmore-button {
  background-color: #007BFF;
  color: #fff;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}

/* Styling the "Collapse" Button */
.readmore-button.collapse {
  background-color: #FF4500;
}
```
