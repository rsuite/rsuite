### 图标

<!--start-code-->

```js
/**
 * import AvatarUser from '@/resources/images/logo.svg';
 * AvatarUser 是 import 的外部资源。
 */

const instance = (
  <div className="avatar-group">
    <Avatar>
      <Icon icon="user" />
    </Avatar>
    <Avatar>
      <Icon>
        <AvatarUser />
      </Icon>
    </Avatar>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
