### 徽标

<!--start-code-->

```js
/**
 * import AvatarUser from '@/resources/images/logo.svg';
 * AvatarUser 是 import 的外部资源。
 */

const instance = (
  <div className="avatar-group">
    <Badge>
      <Avatar>
        <Icon icon={AvatarUser} />
      </Avatar>
    </Badge>

    <Badge content="20">
      <Avatar>
        <Icon icon={AvatarUser} />
      </Avatar>
    </Badge>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
