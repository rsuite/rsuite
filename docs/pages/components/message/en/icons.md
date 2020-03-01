### Icons

<!--start-code-->

```js
const instance = (
  <div>
    <Message showIcon type="info" description="Informational" />
    <Message showIcon type="success" description="Success" />
    <Message showIcon type="warning" description="Warning" />
    <Message showIcon type="error" description="Error" />

    <Message
      showIcon
      type="info"
      title="Informational"
      description="Additional description and informations about copywriting."
    />

    <Message
      showIcon
      type="success"
      title="Success"
      description="Detailed description and advices about successful copywriting."
    />

    <Message
      showIcon
      type="warning"
      title="Warning"
      description="This is a warning notice about copywriting."
    />

    <Message
      showIcon
      type="error"
      title="Error"
      description="This is an error message about copywriting."
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
