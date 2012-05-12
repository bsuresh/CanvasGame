var SURESHBSUB =  {};
SURESHBSUB.utils  = {};
SURESHBSUB.utils.colorToRGB = function (colour, alpha) {
	//if string format, convert to number
	if( typeof colour === 'string' && colour[0] === '#') {
		colour = window.parseInt(colour.slice(1), 16);
	}
	alpha = (alpha === undefined) ? 1 : alpha;

	//extract componenet values
	var r = colour >> 16 & 0xff,
		g = colour >> 8 & 0xff,
		b = colour & 0xff,
		a = (alpha < 0) ?  0 : ((alpha > 1) ? 1 : alpha); //check range

	//use 'rgba' if needed
	if(a === 1) {
		return "rgb(" + r +","+ g +","+ b +")";
	}
	else 
	{
		return "rgba("+ r +","+ g +","+ b +","+ a +")";
	}
};

SURESHBSUB.utils.parseColour = function (colour, toNumber) {
	if (toNumber === true)
	{
		if (typeof colour === 'number')
		{
			return (colour | 0); //remove decimal
		}
		if (typeof colour === 'string' && colour[0] === '#')
		{
			colour = colour.slice(1);
		}
		return window.parseInt(colour, 16);
	}
	else {
		if (typeof colour === 'number') {
			//pad out the hexadecimal number
			colour = '#' + ('0000' + (colour | 0).toString(16)).substr(-6);
		}
		return colour;
	}
};