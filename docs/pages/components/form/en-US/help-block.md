## Status

---

### Help Text

`<Form.HelpText>` A help description can be defined below the form component. If the `tooltip` property is set, an icon will be displayed on the form component and the help description information will be displayed as `<Tooltip>`.

<!--start-code-->

```js
const instance = (
  <Form>
    <Form.Group>
      <Form.Control name="email" placeholder="Email" />
      <Form.HelpText>This field is required</Form.HelpText>
    </Form.Group>

    <Form.Group>
      <Form.Control name="name" placeholder="Name" />
      <Form.HelpText tooltip>This field is required</Form.HelpText>
    </Form.Group>
  </Form>
);

ReactDOM.render(instance);
```

<!--end-code-->
