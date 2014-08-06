# Responsive Elements

http://kumailht.com/responsive-elements/  
http://www.jonathantneal.com/blog/thoughts-on-media-queries-for-elements/

You can use this for a basic approach to element media queries. If you have a module that appears in several different areas of a website, at different widths, then using CSS' built-in media queries won't do you much good, because we don't care about the width of the page for this module, we care about the width of the module itself.

## Basic Usage

Include in your HTML, right before closing body tag of course.

~~~html
<script src="PATH/responsive-elements.min.js"></script>
~~~

Define which elements you'd like to respond to "media queries" by adding the `data-respond` (configurable) attribute.

~~~html
<div class="module-calendar" data-respond>
  ...
</div>
~~~

Then enable it in your Javascript file

~~~js
re.enable();
~~~

Or set configuration and then enable

~~~js
re.setConfig({
  start:    300,
  end:      650,
  interval: 25
}).enable();
~~~

Now in your CSS, setup selectors to target certain widths

~~~css
/* Mobile first */
.module-calendar {font-size: 1.4em;}

/* Wider than 320 */
.module-calendar[data-width~="gt320"] {font-size: 1.2em;}

/* Wider than 640, narrower than 800 */
.module-calendar[data-width~="gt640"][data-width~="lt800"] {font-size: 1em;}
~~~

## How It Works

To keep things accessible, `em` units are preffered for responsive websites.

So, say you have a calendar module that you'd like to change the background color when it's width is wider than `300px` at the base font size (`16px` in most browsers).

~~~css
.module-calendar[data-width~"gt300"] {background-color: green;}
~~~

But now what if you bump your browser's default font size up to `24px`? You probably have a module's ancestor width set to an `em` value, so this will increase because of the browser font size change. As will your module, it's pixel width value will be larger, and probably it's font size and everything else respectively. So, if we only responded to an exact pixel value of `300`, then our new background color wouldn't show correctly, because our widget is much wider (in pixel values) now.

Hopefully this all makes sense.

So, if you just provide your base font size to base calculations off (the default of `16` is usually fine), then Responsive Elements will calculate the "intended" width of the element.

For example, if your element is measured at `500px` wide while the root font size is `16px`, when you bump your root font up to `24px`, the element will be measured at about `833px` (`500 + (500 * (16 / 24))`). Responsive Elements knows this though and reports the width back as `500`, so that your selectors still apply correctly.

## Data Options

Each responsive element can control its own `start`, `end` and `interval` values as well. The format of the values is pretty loose, allowing you to choose what you prefer, as long as you follow the "keyword/letter followed by number" format.

~~~html
<div class="module-calendar" data-respond="s300e500i25">...</div>
<div class="module-heading" data-respond="start: 450, i: 75">...</div>
<div class="module-buttons" data-respond="e 1020; i: 120 start450">...</div>
~~~

Those would render as something like:

~~~html
<div class="module-calendar" data-respond="s300e500i25" data-width="gt300 gt325 gt350 gt375 gt400 lt425 lt450 lt475 lt500">...</div>
~~~

## Methods

### `re.setConfig(config)`

Sets the configuration


| Option | Default | Description |
|:-------|:--------|:------------|
| `attr` | `'data-respond'` | Opt-in attribute for elements |
| `widthAttr` | `'data-width'` | Attribute to check against in CSS selectors |
| `refreshRate` | `50` | Time to wait after page resize to update |
| `rootFontSize` | computed size of root (`html`) element | |
| `baseFontSize` | `16` | Your site's base font size, if different from root font size |
| `start` | `100` | When to start querying width |
| `end` | `900` | When to stop querying width |
| `interval` | `50` | How often to query width |

~~~js
re.setConfig({
  attr: 'data-responsive',
  start: 400,
  end:   700
});
~~~

### `re.enable([config])`

Enable responsive elements on page load and monitors window resizes.

Allows passing the configuration as a shortcut for `setConfig()`

~~~js
re.enable();
re.enable({start: 100});
~~~

### `re.disable()`

Disables repsonsive elements. Window resizing will not update responsive elements.

~~~js
re.disable()
~~~

### `re.refresh()`

Causes responsive elements to refresh and calculate widths. Useful for when content is modified and/or shown/hidden.

~~~js
re.refresh()
~~~
