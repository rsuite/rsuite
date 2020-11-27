<!--start-code-->

```js
/**
 * import * as SvgIcons from '@/components/SvgIcons'
 * SvgIcons is external resources.
 *
 * <style>
 *   .rs-icon.fill-color use{
 *       fill: currentColor;
 *   }
 * </style>
 */
const App = () => {
  const [value, setValue] = React.useState(2.5);
  const handleChange = value => {
    setValue(value);
  };
  return (
    <div>
      <div>
        <Rate
          allowHalf
          value={value}
          character={<Heart />}
          color="red"
          onChange={handleChange}
        />
      </div>
      <div>
        <Rate allowHalf value={value} character="鼎" color="blue" onChange={handleChange} />
      </div>
      <div>
        <Rate allowHalf value={value} character="A" onChange={handleChange} />
      </div>
      <div>
        <Rate allowHalf value={value} character="👍" onChange={handleChange} />
      </div>
      <div>
        <Rate
          allowHalf
          value={value}
          vertical
          character={<Icon className="fill-color" as={SvgIcons.Dark} />}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
