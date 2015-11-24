'use strict';

var deasync = require('deasync');
var browserify = require('browserify');
var debowerify = require('debowerify');

var urify = require('./urify');
var stringify = require('./stringify');

module.exports = function (file, browserifyOpts) {
    var content = '';
    var isDone = false;

    // do browserify
    browserify(file.realpath, browserifyOpts || {})
        .transform(stringify(['.tpl', '.html'], file.dirname)) // 支持 require(tpl/html)
        .transform(debowerify) // 支持 bower
        .transform(urify) // 支持 fis 的 __uri() 资源定位
        .on('file', function (depFilePath) {
            // find dependences
            if (depFilePath !== file.realpath) {
                file.cache.addDeps(depFilePath);
            }
        })
        .bundle(function (err, buff) {
            if (err) {
                content = 'console.error(' + JSON.stringify(err.message) + ');' +
                          'console.error(' + JSON.stringify(err.annotated) + ');';
            } else {
                content = buff.toString();
            }
            isDone = true;
        });

    // 使用 deasync 让 browserify 同步输出到 content
    deasync.loopWhile(function (){
        return !isDone;
    });
    // // 替换 `require` 为 `rq`，确保不要被 fis 重定位 require 文件
    // return content.replace(/\brequire\b/g, 'rq');
    return content;
};
