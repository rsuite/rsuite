### 列表尺寸

<!--start-code-->

```js
const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];

ReactDOM.render(
  <div>
    <p style={{ marginBottom: 10 }}>窄列表：</p>
    <List size="sm">
      {data.map((item, index) => (
        <List.Item key={index} index={index}>
          {item}
        </List.Item>
      ))}
    </List>
    <hr />
    <p style={{ marginBottom: 10 }}>中等列表(默认)：</p>
    <List size="md">
      {data.map((item, index) => (
        <List.Item key={index} index={index}>
          {item}
        </List.Item>
      ))}
    </List>
    <hr />
    <p style={{ marginBottom: 10 }}>宽列表：</p>
    <List size="lg">
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
