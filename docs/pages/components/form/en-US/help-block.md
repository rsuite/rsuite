## Status

---

### Help Block

`<FormHelpText>` A help description can be defined below the form component. If the `tooltip` property is set, an icon will be displayed on the form component and the help description information will be displayed as `<Tooltip>`.

<!--start-code-->

```js
const instance = (
  <Form>
    <FormGroup>
      <FormControl name="email" placeholder="Email" />
      <FormHelpText>This field is required</FormHelpText>
    </FormGroup>

    <FormGroup>
      <FormControl name="name" placeholder="Name" />
      <FormHelpText tooltip>This field is required</FormHelpText>
    </FormGroup>
  </Form>
);

ReactDOM.render(instance);
```

<!--end-code-->
