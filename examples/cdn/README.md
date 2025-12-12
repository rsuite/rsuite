### Using CDN

Add `script` and `link` tags in your browser and use the global variable `rsuite`. We provide relevant files in the rsuite npm package. You can also download these files directly from [![cdnjs][cdnjs-badge]][cdnjs-home], [![jsDelivr][jsdelivr-badge]][jsdelivr-home] or [UNPKG][unpkg-home].

**Current Version**: This example uses rsuite 5.70.1 with React 18.

**Note**: rsuite 6.x is not recommended for CDN/UMD usage in production environments. The UMD build requires additional webpack configuration (adding `react-dom/client` to externals). For production use with rsuite 6.x, we recommend using a build tool (Webpack, Vite, etc.) instead of CDN.

For more examples using build tools, see:
- [with-vite](../with-vite)
- [with-nextjs-app](../with-nextjs-app)
- [with-typescript](../with-typescript)

[cdnjs-badge]: https://img.shields.io/cdnjs/v/rsuite.svg?style=flat-square
[cdnjs-home]: https://cdnjs.com/libraries/rsuite
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/rsuite/badge
[jsdelivr-home]: https://www.jsdelivr.com/package/npm/rsuite
[unpkg-home]: https://unpkg.com/browse/rsuite/dist/
