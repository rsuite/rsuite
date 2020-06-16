### 边框

<!--start-code-->

```js
const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];

ReactDOM.render(
  <div>
    <List bordered>
      {data.map((item, index) => (
        <List.Item key={index} index={index}>
          {item}
        </List.Item>
      ))}
    </List>
  </div>
);
```

<!--end-code-->
