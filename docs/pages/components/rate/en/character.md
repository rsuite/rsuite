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
  const onChnage = value => {
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
          onChange={onChnage}
        />
      </div>
      <div>
        <Rate allowHalf value={value} character="鼎" color="blue" onChange={onChnage} />
      </div>
      <div>
        <Rate allowHalf value={value} character="A" onChange={onChnage} />
      </div>
      <div>
        <Rate allowHalf value={value} character="😀" onChange={onChnage} />
      </div>
      <div>
        <Rate
          allowHalf
          value={value}
          vertical
          character={<Icon className="fill-color" icon={SvgIcons.Dark} />}
          onChange={onChnage}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
