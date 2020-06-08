### `<ul>`: The Unordered List element

The HTML `<ul>` element represents an unordered list of items, typically rendered as a bulleted list.

<!--start-code-->

```js
const instance = (
  <div>
    <p>Simple example:</p>
    <ul>
      <li>first item</li>
      <li>second item</li>
      <li>third item</li>
    </ul>
    <hr />

    <p>Nesting a list:</p>
    <ul>
      <li>first item</li>
      <li>
        second item
        <ul>
          <li>second item first subitem</li>
          <li>
            second item second subitem
            <ul>
              <li>second item second subitem first sub-subitem</li>
              <li>second item second subitem second sub-subitem</li>
              <li>second item second subitem third sub-subitem</li>
            </ul>
          </li>
          <li>second item third subitem</li>
        </ul>
      </li>
      <li>third item</li>
    </ul>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
