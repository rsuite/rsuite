var path = require('path');
var webpack = require('webpack');
var marked = require('marked');
var hl = require('highlight.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
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

var plugins = [
    new ExtractTextPlugin('[name].css')
];

if (isPublish) {

    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));

    plugins.push(new webpack.BannerPlugin(`Last update: ${new Date().toString()}`));
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    }));
}

module.exports = {
    entry: {
        index: './docs/index.js',
        vendor: ['react', 'react-dom', 'lodash', 'classnames', 'dom-lib']
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
                    'transform/cacheable?brfs',
                    'babel?babelrc'
                ],
                exclude: /node_modules/
            }, {
                test:/\.less$/,
                loader:  ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
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
