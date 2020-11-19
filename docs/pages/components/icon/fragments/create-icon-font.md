<!--start-code-->

```js
const Icon = createIconFont({
  scriptUrl: '//at.alicdn.com/t/font_2120285_ve2eozz092d.js',
});

const instance = (
  <div className="icon-example-list">
    <Icon icon="rs-upload" />
    <Icon icon="rs-upload" style={{ fontSize: 50 }} />
    <Icon icon="rs-upload" style={{ color: 'tomato' }} />
    <Icon icon="rs-cog" spin />
    <Icon icon="rs-spinner" pulse />
    <Icon icon="rs-upload" rotate={90} />
    <Icon icon="rs-upload" flip="horizontal" />
    <Icon icon="rs-upload" flip="vertical" />
    <Icon
      icon="rs-upload"
      onClick={() => {
        console.log('You clicked Icon');
      }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
