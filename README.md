# cutout
CSS Sprites are a great technique to reduce file size and the number of requests by packing all your images into one single image.
There are a couple of generators outside (like Texture Packer) that helps by generating the needed css classes.

But using CSS Sprites has also limitations especially when you try to repeat or cover images. 
Cutout provides a solution that creates a base64 image out of a CSS Sprite class.

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



