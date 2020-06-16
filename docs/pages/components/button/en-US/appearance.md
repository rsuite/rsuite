### Appearance

`appearance` property can set appearance of button:

* 'default'(default) default button.
* 'primary' Emphasi, guide button.
* 'link' Button like link.
* 'subtle' Weakened button.
* 'ghost' Ghost button, background transparent, place button on background element.

<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Button appearance="default">Default</Button>
    <Button appearance="primary">Primary</Button>
    <Button appearance="link">Link</Button>
    <Button appearance="subtle">Subtle</Button>
    <Button appearance="ghost">Ghost</Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
