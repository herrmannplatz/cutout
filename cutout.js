
(function(){

	// check for canvas
	var canvasSupported = !!window.HTMLCanvasElement;

	// cache served images
	var cache = {};

	// convert image to base64
	function getBase64Image(img, offsetX, offsetY, width, height) {
	  	
	  	var cvs = document.createElement("canvas");
	  	var ctx = cvs.getContext("2d");
	  	var x = offsetX || 0;
	 	var	y = offsetY || 0;

	 	cvs.width = width || img.width;
		cvs.height = height || img.height;
		ctx.drawImage(img, x, y, cvs.width, cvs.width, 0, 0, cvs.width, cvs.width); 
		return cvs.toDataURL("image/png");
	}

	// extract background styles and export as base64
	function exportImage(img, style, callback) {
		var position = style.backgroundPosition.split(" ");
		var	x = Math.abs(parseInt(position[0]));
		var	y = Math.abs(parseInt(position[1]));
		var	width = parseInt(style.width);
		var	height = parseInt(style.height);
		return getBase64Image(img,x,y, width, height); 
	}

	// api 
	function cutout(selector, callback) {
		
		if(cache[selector]) {
			callback(cache[selector]);
			return;
		}

		var div = document.createElement('div');
		div.className = selector;
		div.style.display = 'none';
		document.body.appendChild(div); // clean up missing

		var style = div.currentStyle || window.getComputedStyle(div, null);
		var url = style.backgroundImage.slice(4, -1);

		var img = new Image();
		img.onload = function(e) {
			cache[selector] = exportImage(img, style, callback); // cache image
			document.body.removeChild(div);
			callback(cache[selector]);
		};
		img.src = url;
	}

	// expose
	if(!window.cutout && canvasSupported) {
		window.cutout = cutout;
	}

})();

