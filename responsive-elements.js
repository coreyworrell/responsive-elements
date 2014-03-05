/**
 * Responsive Elements
 *
 * Inspired by https://github.com/kumailht/responsive-elements
 * 
 * @copyright Corey Worrell 2014
 * @version   1.0.0
*/

(function() {
  var ResponsiveElements;
  ResponsiveElements = function(options) {
    var bind, dom, key, makeData, opts, parseParams, respond, respondAll, util, value;
    opts = {
      attr: 'data-respond',
      widthAttr: 'data-width',
      refreshRate: 50,
      rootFontSize: parseInt((getComputedStyle(document.documentElement)).fontSize),
      baseFontSize: 16,
      start: 100,
      end: 900,
      interval: 50
    };
    for (key in options) {
      value = options[key];
      if (opts[key] != null) {
        opts[key] = value;
      }
    }
    dom = {
      window: window,
      elements: document.querySelectorAll("[" + opts.attr + "]")
    };
    util = {
      debounce: function(func, wait, immediate) {
        return function() {
          var args, callNow, context, later, result, timeout;
          context = this;
          args = arguments;
          later = function() {
            var result, timeout;
            timeout = null;
            if (!immediate) {
              return result = func.apply(context, args);
            }
          };
          callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) {
            result = func.apply(context, args);
          }
          return result;
        };
      }
    };
    bind = function() {
      dom.window.addEventListener('load', respondAll);
      return dom.window.addEventListener('resize', util.debounce(respondAll, opts.refreshRate));
    };
    respondAll = function(e) {
      var element, _i, _len, _ref, _results;
      _ref = dom.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        _results.push(respond(element));
      }
      return _results;
    };
    respond = function(element) {
      var data, params;
      params = parseParams(element.getAttribute(opts.attr));
      data = makeData(element.offsetWidth, params);
      return element.setAttribute(opts.widthAttr, data.join(' '));
    };
    makeData = function(width, params) {
      var data, i;
      data = [];
      i = params.interval > params.start ? params.interval : ~~(params.start / params.interval) * params.interval;
      width = width * (opts.baseFontSize / opts.rootFontSize);
      while (i <= params.end) {
        if (i < width) {
          data.push("gt" + i);
        }
        if (i >= width) {
          data.push("lt" + i);
        }
        i += params.interval;
      }
      return data;
    };
    parseParams = function(string) {
      var i, match, matches, params, _i, _len;
      params = {
        start: opts.start,
        end: opts.end,
        interval: opts.interval
      };
      matches = string.match(/([a-zA-Z]|[0-9]+)/g);
      if (!matches) {
        return params;
      }
      for (i = _i = 0, _len = matches.length; _i < _len; i = _i += 2) {
        match = matches[i];
        switch (match.toLowerCase()) {
          case 's':
            params.start = +matches[i + 1];
            break;
          case 'e':
            params.end = +matches[i + 1];
            break;
          case 'i':
            params.interval = +matches[i + 1];
        }
      }
      return params;
    };
    return bind();
  };
  return window.ResponsiveElements = ResponsiveElements;
})();
