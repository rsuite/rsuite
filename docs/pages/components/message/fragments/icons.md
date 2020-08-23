<!--start-code-->

```js
const instance = (
  <div>
    <Message showIcon type="info">
      Informational
    </Message>
    <Message showIcon type="success">
      Success
    </Message>
    <Message showIcon type="warning">
      Warning
    </Message>
    <Message showIcon type="error">
      Error
    </Message>

    <Message showIcon type="info" header="Informational">
      Additional description and informations about copywriting.
    </Message>

    <Message showIcon type="success" header="Success">
      Detailed description and advices about successful copywriting.
    </Message>

    <Message showIcon type="warning" header="Warning">
      This is a warning notice about copywriting.
    </Message>

    <Message showIcon type="error" header="Error">
      This is an error message about copywriting.
    </Message>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
