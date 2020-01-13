### Badge

<!--start-code-->

```js
/**
 * import AvatarUser from '@/resources/images/logo.svg';
 * AvatarUser is external resources.
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
