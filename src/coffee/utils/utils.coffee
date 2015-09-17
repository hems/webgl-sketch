window.PI      = Math.PI
window.TWO_PI  = Math.PI * 2
window.HALF_PI = Math.PI / 2

Number::map = (in_min, in_max, out_min, out_max, val) ->
	(this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

module.exports =

	lerp: ( min, max, ratio ) ->
		min + ((max - min) * ratio)

	random: ( min, max ) ->
		min + Math.random() * (max - min)

	distance: ( x1, y1, x2, y2 ) ->
		return Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) )