# Responsive Elements

http://kumailht.com/responsive-elements/  
http://www.jonathantneal.com/blog/thoughts-on-media-queries-for-elements/

You can use this for a basic approach to element media queries. If you have a module that appears in several different areas of a website, at different widths, then using CSS' built-in media queries won't do you much good, because we don't care about the width of the page for this module, we care about the width of the module itself.

## Basic Usage

Include in your HTML, right before closing body tag of course.

*HTML*
~~~html
<script src="PATH/responsive-elements.min.js"></script>
~~~

Define which elements you'd like to respond to "media queries"

*HTML*
~~~html
<div class="module-calendar" data-respond>
  ...
</div>
~~~

Then create a new instance of `ResponsiveElements`

*JavaScript*
~~~js
new ResponsiveElements;
// or
new ResponsiveElements({...});
~~~

Now in your CSS, setup selectors to target certain widths

*CSS*
~~~css
/* Mobile first */
.module-calendar {font-size: 1.4em;}

/* Wider than 320 */
.module-calendar[data-width~="gt320"] {font-size: 1.2em;}

/* Wider than 640, narrower than 800 */
.module-calendar[data-width~="gt640"][data-width~="lt800"] {font-size: 1em;}
~~~
