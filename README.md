# fis-prepackager-browserify

A browserify prepackager for [fis](http://fex-team.github.io/fis-site/) / [Scrat](http://scrat.io) with default transforms:

- [debowerify](https://www.npmjs.com/package/debowerify)

## Usage

You can use all [browserify opts](https://github.com/substack/node-browserify#browserifyfiles--opts):

### fis2

```javascript
fis.config.set('settings.prepackager.browserify', {
    // browserify opts
    browserify: {
        debug: true
    },
});
fis.config.set('modules.prepackager', 'browserify');
fis.config.set('roadmap.path', [
    {
        // source js
        reg: 'src/**/*.js',
        // `isLayout` should be `TRUE`
        isLayout: true
    },
    {
        // other js `isLayout` != `TRUE`
        reg: 'server/**/*.js'
    }
]);
```

### fis3

```javascript
fis.match('index.js', {
    release: '$0',
    preprocessor: fis.plugin('browserify')
});
```
