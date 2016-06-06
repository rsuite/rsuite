var path = require('path');
var webpack = require('webpack');
var marked = require('marked');
var hl = require('highlight.js');

const isPublish = process.env.NODE_ENV === 'publish';

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

var plugins = [];

if (isPublish) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    plugins.push(new webpack.BannerPlugin(`Last update: ${new Date().toString()}`));
}

module.exports = {
    entry: {
        index: './docs/index.js'
    },
    output: {
        path: path.join(__dirname, 'docs/assets'),
        filename: '[name].js'
    },
    node: {
        fs: 'empty'
    },
    module: {
        loaders: [
            {
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
            }
        ]
    },
    plugins: plugins,
    markdownLoader: {
        renderer: renderer
    }
};
