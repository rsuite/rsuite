var path = require('path');
var webpack = require('webpack');
var marked = require('marked');
var hl = require('highlight.js');

const codeRenderer = function (code, lang) {
    lang = lang === 'js' ? 'javascript' : lang;
    if (lang === 'html') {
        lang = 'xml';
    }

    var hlCode = lang ? hl.highlight(lang, code).value : hl.highlightAuto(code).value;

    return `<div class="doc-highlight"><pre><code class="${lang || ''}">${hlCode}</code></pre></div>`;
};

var renderer = new marked.Renderer();

renderer.code = codeRenderer;

module.exports = {
    entry: {
        index: './docs/index.js'
    },
    output: {
        path: path.join(__dirname, 'docs/_build'),
        filename: '[name].js',
        library: 'Suite',
        libraryTarget: 'umd'
    },
    node: {
        fs: 'empty'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: [
                'react-hot',
                'transform/cacheable?brfs',
                'babel?babelrc'
            ],
            exclude: /node_modules/
        }, {
                test: /\.less$/,
                loaders: [
                    'style',
                    'css?minimize',
                    'postcss',
                    'less'
                ],
                include: [
                    path.join(__dirname, 'docs')
                ]
            }, {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css?minimize',
                    'postcss'
                ]
            }, {
                test: /\.md$/,
                loader: 'html!markdown'
            }]
    },
    markdownLoader: {
        renderer: renderer
    }
};
