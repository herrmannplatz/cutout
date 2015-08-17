$(function() {
    "use strict";

    $('.cover')
        .cutout("sprite letter-b")
        .css({
            width : '100px',
            height : '100px',
            backgroundSize : 'cover'
        });

    $('.repeat')
        .cutout("sprite letter-b")
        .css({
            width : '200px',
            height : '50px',
            backgroundRepeat : 'repeat-x'
        });

});