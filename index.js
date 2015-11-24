'use strict';

var browserify = require('./src/browserify');

module.exports = function (content, file, conf) {
    if (file.isJsLike && /\.js/.test(file.realpath)) {
        content = browserify(file, (conf || {}).browserify);
    }
    return content;
};

