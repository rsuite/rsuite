### Characters

You can use other icons, emoji, numbers, Chinese or other custom patterns

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
          character={<Icon icon="heart" />}
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
          character={<Icon className="fill-color" icon={SvgIcons.Dark} />}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
