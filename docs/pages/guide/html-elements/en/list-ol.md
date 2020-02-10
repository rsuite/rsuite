### `<ol>`: The Ordered List element

The HTML `<ol>` element represents an ordered list of items, typically rendered as a numbered list.

<!--start-code-->

```js
const instance = (
  <div>
    <p>Simple example:</p>
    <ol>
      <li>first item</li>
      <li>second item</li>
      <li>third item</li>
    </ol>
    <hr />

    <p>Nesting a list:</p>
    <ol>
      <li>first item</li>
      <li>
        second item
        <ol>
          <li>second item first subitem</li>
          <li>
            second item second subitem
            <ol>
              <li>second item second subitem first sub-subitem</li>
              <li>second item second subitem second sub-subitem</li>
              <li>second item second subitem third sub-subitem</li>
            </ol>
          </li>
          <li>second item third subitem</li>
        </ol>
      </li>
      <li>third item</li>
    </ol>
  </div>
);
ReactDOM.render(instance);
```
<!--end-code-->
