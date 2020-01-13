### With Icon

<!--start-code-->

```js
/**
 * import AvatarUser from '@/resources/images/logo.svg';
 * AvatarUser is external resources.
 */

const instance = (
  <div className="avatar-group">
    <Avatar>
      <Icon icon="user" />
    </Avatar>
    <Avatar>
      <Icon icon={AvatarUser} />
    </Avatar>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
