
/**
 * Responsive Elements
 *
 * Inspired by https://github.com/kumailht/responsive-elements
 * 
 * @copyright Corey Worrell 2014
 * @version   1.1.0
 */
(function() {
  return window.re = (function() {
    var b, bind, debounceRespondAll, makeData, parseParams, respond, respondAll, unbind, util;
    b = this;
    b.config = {
      attr: 'data-respond',
      widthAttr: 'data-width',
      refreshRate: 50,
      rootFontSize: parseInt((getComputedStyle(document.documentElement)).fontSize),
      baseFontSize: 16,
      start: 100,
      end: 900,
      interval: 50
    };
    b.dom = {
      window: window,
      elements: document.querySelectorAll("[" + b.config.attr + "]")
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
      return dom.window.addEventListener('resize', debounceRespondAll);
    };
    unbind = function() {
      dom.window.removeEventListener('load', respondAll, false);
      return dom.window.removeEventListener('resize', debounceRespondAll, false);
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
    debounceRespondAll = util.debounce(respondAll, b.config.refreshRate);
    respond = function(element) {
      var data, params;
      params = parseParams(element.getAttribute(b.config.attr));
      data = makeData(element.offsetWidth, params);
      return element.setAttribute(b.config.widthAttr, data.join(' '));
    };
    makeData = function(width, params) {
      var data, i;
      data = [];
      i = params.interval > params.start ? params.interval : ~~(params.start / params.interval) * params.interval;
      width = width * (b.config.baseFontSize / b.config.rootFontSize);
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
        start: b.config.start,
        end: b.config.end,
        interval: b.config.interval
      };
      matches = string.match(/([a-zA-Z]+|[0-9]+)/g);
      if (!matches) {
        return params;
      }
      for (i = _i = 0, _len = matches.length; _i < _len; i = _i += 2) {
        match = matches[i];
        switch (match[0].toLowerCase()) {
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
    b.setConfig = function(config) {
      var key, value;
      for (key in config) {
        value = config[key];
        if (b.config[key] != null) {
          b.config[key] = value;
        }
      }
      b.dom.elements = document.querySelectorAll("[" + b.config.attr + "]");
      return b;
    };
    b.enable = function(config) {
      if (config) {
        b.setConfig(config);
      }
      bind();
      return b;
    };
    b.disable = function() {
      unbind();
      return b;
    };
    b.refresh = function() {
      respondAll();
      return b;
    };
    return b;
  })();
})();
