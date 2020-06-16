### Default

<!--start-code-->

```js
const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];

ReactDOM.render(
  <List>
    {data.map((item, index) => (
      <List.Item key={index} index={index}>
        {item}
      </List.Item>
    ))}
  </List>
);
```

<!--end-code-->
