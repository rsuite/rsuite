### `<a>`: The Anchor element

The HTML `<a>` element (or anchor element), along with its href attribute, creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.

You can also implement a Link through the Button component.

<!--start-code-->

```js
const instance = (
  <div>
    <p>You can reach Michael at:</p>
    <p>
      <a href="https://example.com">Website</a>
    </p>
    <p>
      <a href="mailto:m.bluth@example.com">Email</a>
    </p>
    <p>
      <a href="tel:+123456789">Phone</a>
    </p>
    <hr />
    <p>Link created by Button:</p>
    <ButtonToolbar>
      <Button appearance="link" href="https://example.com">
        Website
      </Button>
      <Button appearance="link" href="mailto:m.bluth@example.com">
        Email
      </Button>
      <Button appearance="link" href="tel:+123456789">
        Phone
      </Button>
    </ButtonToolbar>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
