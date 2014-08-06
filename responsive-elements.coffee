###*
 * Responsive Elements
 *
 * Inspired by https://github.com/kumailht/responsive-elements
 * 
 * @copyright Corey Worrell 2014
 * @version   1.1.0
###

do ->
	window.re = do ->
		b = this

		# Configuration
		b.config =
			attr:         'data-respond'
			widthAttr:    'data-width'
			refreshRate:  50
			rootFontSize: parseInt (getComputedStyle document.documentElement).fontSize
			baseFontSize: 16
			start:        100
			end:          900
			interval:     50

		# DOM elements
		b.dom =
			window:   window
			elements: document.querySelectorAll "[#{b.config.attr}]"

		# Utilities
		util =
			debounce: (func, wait, immediate) ->
				->
					context = @
					args    = arguments

					later = ->
						timeout = null;

						if ! immediate
							result = func.apply context, args

					callNow = immediate and ! timeout

					clearTimeout timeout

					timeout = setTimeout later, wait

					if callNow
						result = func.apply context, args

					result

		# Bind listeners
		bind = ->
			dom.window.addEventListener 'load', respondAll
			dom.window.addEventListener 'resize', debounceRespondAll

		# Unbind listeners
		unbind = ->
			dom.window.removeEventListener 'load', respondAll, false
			dom.window.removeEventListener 'resize', debounceRespondAll, false

		# Respond all elements
		respondAll = (e) ->
			for element in dom.elements
				respond element

		# Respond with a debounce
		debounceRespondAll = util.debounce respondAll, b.config.refreshRate

		# Respond single element
		respond = (element) ->
			params = parseParams (element.getAttribute b.config.attr)

			data = makeData element.offsetWidth, params

			element.setAttribute b.config.widthAttr, (data.join ' ')

		# Make responsive data
		makeData = (width, params) ->
			data = []

			i = if params.interval > params.start then params.interval else ~~(params.start / params.interval) * params.interval

			width = width * (b.config.baseFontSize / b.config.rootFontSize)

			while i <= params.end
				data.push "gt#{i}" if i < width
				data.push "lt#{i}" if i >= width

				i += params.interval

			data

		# Parse parameters
		parseParams = (string) ->
			params  =
				start:    b.config.start
				end:      b.config.end
				interval: b.config.interval

			matches = string.match /([a-zA-Z]+|[0-9]+)/g

			if ! matches
				return params

			for match, i in matches by 2
				switch match[0].toLowerCase()
					when 's' then params.start    = +matches[i + 1]
					when 'e' then params.end      = +matches[i + 1]
					when 'i' then params.interval = +matches[i + 1]

			params

		# Public methods
		# Set configuration
		b.setConfig = (config) ->
			for key, value of config
				b.config[key] = value if b.config[key]?

			b.dom.elements = document.querySelectorAll "[#{b.config.attr}]"

			b

		# Enable
		b.enable = ->
			bind()
			b

		# Disable
		b.disable = ->
			unbind()
			b

		# Refresh
		b.refresh = ->
			respondAll()
			b

		# Return self
		b
