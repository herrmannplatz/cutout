# cutout
Cutout extracts images from css sprite sheets. It will add the generated image as base64 encoded `background-image` to the specified element. This way you can use `background-size: cover` and `background-repeat: repeat` with the desired sprite.

Usage
------

Use your favourite sprite sheet tool to generate the sprite sheet.

```css 
.sprite {
  display:inline-block;
  overflow:hidden;
  background-repeat: no-repeat;
  background-image: url(css.png);
}
 
.background {
  width: 10px;
  height: 10px;
  background-position: -20px -150px
}
```

Call the `cutout` function on the desired jquery element with the css class for the sprite you want to extract.

```javascript
$('<div/>')
  .cutout'"sprite background')
  .css({
    width: '1000px',
    height: '1000px',
    backgroundSize: 'cover'
})
.appendTo($('body'));
```
