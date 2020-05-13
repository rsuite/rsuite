### `<dl>`：The Description List element

The HTML `<dl>` element represents a description list. The element encloses a list of groups of terms (specified using the `<dt>` element) and descriptions (provided by `<dd>` elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).

<!--start-code-->

```js
const instance = (
  <dl>
    <dt>Name:</dt>
    <dd>React Suite</dd>
    <dt>Born:</dt>
    <dd>2016</dd>
    <dt>Birthplace:</dt>
    <dd>China</dd>
    <dt>Color:</dt>
    <dd>Blue</dd>
  </dl>
);
ReactDOM.render(instance);
```

<!--end-code-->