# cutout
extract images from css sprite sheet.

## Example
css 
	
	.sprite {
	  display:inline-block;
	  overflow:hidden;
	  background-repeat: no-repeat;
	  background-image:url(css.png);
	}
	 
	.background {
	  width:10px;
	  height:10px;
	  background-position: -20px -150px
	}

	...

js
	
	cutout("sprite background", function(image) {
		var div = document.createElement('div');
		div.style.width = '1000px';
		div.style.height = '1000px';
		div.style.background = 'url(' + image + ')';
		div.style.backgroundSize = 'cover'; 
		document.body.appendChild(div);
	});

## jQuery Example

	$('<div/>')
		.cutout("sprite background")
		.css({
			width : '1000px',
			height : '1000px',
			backgroundSize : 'cover'
		})
		.appendTo($('body'));
		



