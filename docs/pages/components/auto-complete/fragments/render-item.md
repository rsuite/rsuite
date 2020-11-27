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
    renderMenuItem={item => {
      return (
        <div>
          <Star /> {item.label}
        </div>
      );
    }}
  />
);

ReactDOM.render(instance);
```

<!--end-code-->
