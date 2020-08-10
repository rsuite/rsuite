### 字符

你可以使用其他 icon、emoji、数字、中文或是其他自定义的图案

<!--start-code-->

```js
/**
 * import * as SvgIcons from '@/components/SvgIcons'
 * SvgIcons 是 import 的外部资源。
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
