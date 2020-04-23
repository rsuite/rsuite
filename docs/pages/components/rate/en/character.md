### Characters

You can use other icons, numbers, Chinese or other custom patterns

<!--start-code-->

```js
const App = () => {
  const [value, setValue] = React.useState(2.5);
  const onChnage = value => {
    setValue(value);
  };
  return (
    <div>
      <div>
        <Rate
          allowHalf
          value={value}
          character={<Icon icon="heart" size="2x" />}
          color="red"
          onChange={onChnage}
        />
      </div>
      <div>
        <Rate allowHalf value={value} character="鼎" color="blue" onChange={onChnage} />
      </div>

      <div>
        <Rate allowHalf value={value} character="A" onChange={onChnage} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
