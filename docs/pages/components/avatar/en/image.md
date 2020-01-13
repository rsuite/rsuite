### Image avatar

You can set `alt` for `<Avatar>` , it make sure avatar show pure text avatar when image load failed.

<!--start-code-->

```js
const instance = (
  <div className="avatar-group">
    <Avatar src="https://404.error" alt="RS" />
    <Avatar src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" />
    <Avatar
      circle
      src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
