### `<p>`: The Paragraph element

The HTML `<p>` element represents a paragraph. Paragraphs are usually represented in visual media as blocks of text separated from adjacent blocks by blank lines and/or first-line indentation, but HTML paragraphs can be any structural grouping of related content, such as images or form fields.
<!--start-code-->

```js
const instance = (
  <div>
    <p>
      This is the first paragraph of text. This is the first paragraph of text.
      This is the first paragraph of text. This is the first paragraph of text.
    </p>
    <p>
      This is the second paragraph. This is the second paragraph. This is the
      second paragraph. This is the second paragraph.
    </p>
    <hr />
    <p>
      You can use the mark tag to <mark>highlight</mark> text.
    </p>
    <p>
      <del>This line of text is meant to be treated as deleted text.</del>
    </p>
    <p>
      <s>This line of text is meant to be treated as no longer accurate.</s>
    </p>
    <p>
      <ins>
        This line of text is meant to be treated as an addition to the document.
      </ins>
    </p>
    <p>
      <u>This line of text will render as underlined</u>
    </p>
    <p>
      <small>This line of text is meant to be treated as fine print.</small>
    </p>
    <p>
      <strong>This line rendered as bold text.</strong>
    </p>
    <p>
      <em>This line rendered as italicized text.</em>
    </p>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
