(function($) {
  'use strict';

  // cache served images
  var cache = {};

  // convert image to base64
  function getBase64Image(img, rect) {
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    var x = rect.x || 0;
    var y = rect.y || 0;

    cvs.width = rect.width || img.width;
    cvs.height = rect.height || img.height;
    ctx.drawImage(img, x, y, cvs.width, cvs.height, 0, 0, cvs.width, cvs.height);
    return cvs.toDataURL('image/png');
  }

  function getSpriteRect(element) {
    var pos = element.css('background-position').split(' ');
    return {
      x: Math.abs(parseInt(pos[0], 10)),
      y: Math.abs(parseInt(pos[1], 10)),
      width: element.width(),
      height: element.height()
    }
  }

  function setBackgroundImageURL(element, url) {
    return element.css({
      'background-image' : 'url(' + url + ')'
    });
  }

  $.fn.extend({

    cutout: function(selector) {
      var self = this;
      var div;
      var url;
      var rect;

      // check cache
      if (cache[selector]) {
        return setBackgroundImageURL(self, cache[selector]);
      }

      // create temporary div
      div = $('<div/>')
        .addClass(selector)
        .insertBefore($('body'))
        .hide();

      // extract sprite properties
      url = div.css('background-image').slice(4, -1).replace(/"/g, '');
      rect = getSpriteRect(div);

      // clean up
      div.remove();

      // load sprite sheet
      $('<img/>')
        .load(function() {
          cache[selector] = getBase64Image(this, rect);
          setBackgroundImageURL(self, cache[selector]);
        })
        .error(function() {
          console.warn('unable to get image from class ' + selector);
        })
        .attr({ src : url });

      return self;
    }
  });

}(jQuery));