### Text

You can change the `<Avatar>` background color and font color by `style`;

<!--start-code-->

```js
const instance = (
  <div className="avatar-group">
    <Avatar>RS</Avatar>
    <Avatar style={{ background: '#7B1FA2' }}>RS</Avatar>
    <Avatar style={{ background: '#edfae1', color: '#4caf50' }}>RS</Avatar>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
