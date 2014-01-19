/*jslint es5: true, indent: 4 */
/*global window, document, Image */

// check for canvas
if (!!window.HTMLCanvasElement) {

    (function() {
        "use strict";

        // cache served images
        var cache = {};

        // convert image to base64
        function getBase64Image(img, offsetX, offsetY, width, height) {
            var cvs = document.createElement("canvas"),
                ctx = cvs.getContext("2d"),
                x = offsetX || 0,
                y = offsetY || 0;

            cvs.width = width || img.width;
            cvs.height = height || img.height;
            ctx.drawImage(img, x, y, cvs.width, cvs.width, 0, 0, cvs.width, cvs.width);
            return cvs.toDataURL("image/png");
        }

        // extract background styles and export as base64
        function exportImage(img, style) {
            var position = style.backgroundPosition.split(" "),
                x = Math.abs(parseInt(position[0], 10)),
                y = Math.abs(parseInt(position[1], 10)),
                width = parseInt(style.width, 10),
                height = parseInt(style.height, 10);
            return getBase64Image(img, x, y, width, height);
        }

        // api 
        function cutout(selector, callback) {
            if (cache[selector]) {
                callback(cache[selector]);
                return;
            }

            var div = document.createElement('div'),
                style, url, img;

            div.className = selector;
            div.style.display = 'none';
            document.body.appendChild(div);

            style = window.getComputedStyle(div, null);
            url = style.backgroundImage.slice(4, -1).replace(/"/g, "");
            img = new Image();

            img.onload = function() {
                cache[selector] = exportImage(img, style); // cache image
                document.body.removeChild(div);
                callback(cache[selector]);
            };
            img.onerror = function() {
                document.body.removeChild(div);
                callback(cache[selector]);
            };
            img.src = url;
        }

        // expose
        window.cutout = window.cutout || cutout;

    })();

}

