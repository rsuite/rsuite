### 自定义选项

<!--start-code-->

```js
const data = [
  'HYPER Advertiser',
  'HYPER Web Analytics',
  'HYPER Video Analytics',
  'HYPER DMP',
  'HYPER Ad Serving',
  'HYPER Data Discovery'
];
const instance = (
  <AutoComplete
    data={data}
    renderItem={item => {
      return (
        <p>
          <Icon icon="star" /> {item.label}
        </p>
      );
    }}
  />
);

ReactDOM.render(instance);
```

<!--end-code-->
