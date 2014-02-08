/*jslint browser: true */
/*global $,cutout */

$(document).ready(function () {
    "use strict";

// dom    
    cutout('sprite letter-a', function(image) {
        var div = document.querySelector('.dom-cover');
        div.style.width = '100px';
        div.style.height = '100px';
        div.style.background = 'url(' + image + ')';
        div.style.backgroundSize = 'cover';
    });

    cutout('sprite letter-a', function(image) {
        var div = document.querySelector('.dom-repeat');
        div.style.width = '200px';
        div.style.height = '50px';
        div.style.background = 'url(' + image + ')';
        div.style.backgroundRepeat = 'repeat-x';
    });

// jquery
    $('.jquery-cover')
        .cutout("sprite letter-b")
        .css({
            width : '100px',
            height : '100px',
            backgroundSize : 'cover'
        });

    $('.jquery-repeat')
        .cutout("sprite letter-b")
        .css({
            width : '200px',
            height : '50px',
            backgroundRepeat : 'repeat-x'
        });

});