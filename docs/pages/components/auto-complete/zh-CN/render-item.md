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
        <div>
          <Icon icon="star" /> {item.label}
        </div>
      );
    }}
  />
);

ReactDOM.render(instance);
```

<!--end-code-->
