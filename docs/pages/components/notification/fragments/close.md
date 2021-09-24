<!--start-code-->

```js
const instance = (
  <div className="notification-container">
    <Notification closable type="info">
      <Paragraph width={320} rows={3} />
    </Notification>
    <Notification closable type="info" header="Informational">
      <Paragraph width={320} rows={3} />
    </Notification>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
