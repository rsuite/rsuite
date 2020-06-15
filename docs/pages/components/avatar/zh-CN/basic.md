### 默认

<!--start-code-->

```js
/**
 * .avatar-group{
 *   display: flex;
 *   align-items: flex-end;
 * }
 *
 * .avatar-group .rs-avatar {
 *   margin-left: 10px;
 * }
 */
const instance = (
  <div className="avatar-group">
    <Avatar>RS</Avatar>
    <Avatar circle>RS</Avatar>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
