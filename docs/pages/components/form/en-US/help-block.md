## Status

---

### Help Block

`<HelpBlock>` A help description can be defined below the form component. If the `tooltip` property is set, an icon will be displayed on the form component and the help description information will be displayed as `<Tooltip>`.

<!--start-code-->

```js
const instance = (
  <Form>
    <FormGroup>
      <FormControl name="email" placeholder="Email" />
      <HelpBlock>This field is required</HelpBlock>
    </FormGroup>

    <FormGroup>
      <FormControl name="name" placeholder="Name" />
      <HelpBlock tooltip>This field is required</HelpBlock>
    </FormGroup>
  </Form>
);

ReactDOM.render(instance);
```

<!--end-code-->
