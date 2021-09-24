<!--start-code-->

```js
const instance = (
  <div>
    <label>Disabled: </label>
    <Checkbox disabled> Default</Checkbox>
    <Checkbox defaultChecked disabled>
      Checked
    </Checkbox>
    <hr />
    <label>Read only: </label>
    <Checkbox readOnly> Default</Checkbox>
    <Checkbox defaultChecked readOnly>
      Checked
    </Checkbox>
    <hr />
    <label>Plaintext: </label>
    <Checkbox plaintext> Default</Checkbox>
    <Checkbox defaultChecked plaintext>
      Checked
    </Checkbox>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
