(function($) {

	var canvasSupported = !!window.HTMLCanvasElement;

	// cache served images
	var cache = {};

	// convert image to base64
	function getBase64Image(img, offsetX, offsetY, width, height) {	
		var cvs = document.createElement("canvas");
		var ctx = cvs.getContext("2d");
		var x = offsetX || 0;
		var y = offsetY || 0;

		cvs.width = width || img.width;
		cvs.height = height || img.height;
		ctx.drawImage(img, x, y, cvs.width, cvs.width, 0, 0, cvs.width, cvs.width); 
		return cvs.toDataURL("image/png");
	}
 	
 	// TODO: options
    function cutout(selector) {

    	var self = this,
    		counter = 0,
    		div,
    		pos,
    		x, y,
    		w, h;

    	// check cache
    	if(cache[selector]) {
    		console.log('cached');
    		return self.css({
				'background-image' : 'url(' + cache[selector] + ')'
			});
		}

		// create temporary div
		div = $('<div></div>')
			.addClass(selector)
			.insertBefore($('body'))
			.hide();
		
		// extract sprite properties
		url = div.css('background-image').slice(4, -1).replace(/"/g, "");
		pos = div.css('background-position').split(" ");
		x = Math.abs(parseInt(pos[0]));
		y = Math.abs(parseInt(pos[1]));
		width = div.width();
		height = div.height();

		// clean up
		div.remove();

		// load sprite sheet
		$('<img/>')
			.load(function(e) {
				cache[selector] = getBase64Image(this,x,y, width, height);
				self.css({
					'background-image' : 'url(' + cache[selector] + ')'
				});
			})
			.error(function(e) {
				console.warn('unable to get image from class ' + selector);
			})
			.attr({ src : url });

		return self;
    }

    if(!$.fn.cutout && canvasSupported) {
		$.fn.cutout = cutout;
	} else {
		console.warn('cutout.js will not work without canvas');
    }
 
}(jQuery));