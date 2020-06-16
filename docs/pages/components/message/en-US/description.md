### Description

<!--start-code-->

```js
const instance = (
  <div>
    <Message
      type="info"
      title="Informational"
      description={
        <p>
          Additional description and informations about copywriting.
          <br />
          <a href="#">This is a Link.</a>
        </p>
      }
    />

    <Message
      type="success"
      title="Success"
      description={
        <p>
          Additional description and informations about copywriting.
          <br />
          <a href="#">This is a Link.</a>
        </p>
      }
    />

    <Message
      type="warning"
      title="Warning"
      description={
        <p>
          Additional description and informations about copywriting.
          <br />
          <a href="#">This is a Link.</a>
        </p>
      }
    />

    <Message
      type="error"
      title="Error"
      description={
        <p>
          Additional description and informations about copywriting.
          <br />
          <a href="#">This is a Link.</a>
        </p>
      }
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
