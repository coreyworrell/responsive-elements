###*
 * Responsive Elements
 *
 * Inspired by https://github.com/kumailht/responsive-elements
 * 
 * @copyright Corey Worrell 2014
 * @version   1.0.0
###

(->
	ResponsiveElements = (options) ->
		# Options
		opts =
			attr:         'data-respond'
			widthAttr:    'data-width'
			refreshRate:  50
			rootFontSize: parseInt (getComputedStyle document.documentElement).fontSize
			baseFontSize: 16
			start:        100
			end:          900
			interval:     50

		for key, value of options
			opts[key] = value if opts[key]?

		# DOM
		dom =
			window:   window
			elements: document.querySelectorAll "[#{opts.attr}]"

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
			dom.window.addEventListener 'resize', (util.debounce respondAll, opts.refreshRate)

		# Respond all elements
		respondAll = (e) ->
			for element in dom.elements
				respond element

		# Respond single element
		respond = (element) ->
			params = parseParams (element.getAttribute opts.attr)

			data = makeData element.offsetWidth, params

			element.setAttribute opts.widthAttr, (data.join ' ')

		# Make responsive data
		makeData = (width, params) ->
			data = []

			i = if params.interval > params.start then params.interval else ~~(params.start / params.interval) * params.interval

			width = width * (opts.baseFontSize / opts.rootFontSize)

			while i <= params.end
				data.push "gt#{i}" if i < width
				data.push "lt#{i}" if i >= width

				i += params.interval

			data

		# Parse parameters
		parseParams = (string) ->
			params  =
				start:    opts.start
				end:      opts.end
				interval: opts.interval

			matches = string.match /([a-zA-Z]|[0-9]+)/g

			if ! matches
				return params

			for match, i in matches by 2
				switch match.toLowerCase()
					when 's' then params.start    = +matches[i + 1]
					when 'e' then params.end      = +matches[i + 1]
					when 'i' then params.interval = +matches[i + 1]

			params

		bind()

	# Export
	window.ResponsiveElements = ResponsiveElements
)()
