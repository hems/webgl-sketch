window.PI      = Math.PI
window.TWO_PI  = Math.PI * 2
window.HALF_PI = Math.PI / 2

window.delay = ( time, funk ) ->
	setTimeout funk, (time*1000)

Number::map = (in_min, in_max, out_min, out_max, val) ->
	(this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min