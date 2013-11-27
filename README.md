# cutout

create base64 image from given sprite sheet class

## Example
	cutout("sprite background", function(image) {
		var div = document.createElement('div');
		div.style.width = '100px';
		div.style.height = '100px';
		div.style.background = 'url(' + image + ')';;
		div.style.backgroundSize = 'cover'; 
		document.body.appendChild(div);
	});

