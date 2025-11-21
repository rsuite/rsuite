<!-- start-code -->

```js
import { Slider, Box } from 'rsuite';

const labels = ['Q1', 'Q2', 'Q3', 'Q4'];

const App = () => {
  const [value, setValue] = React.useState(0);
  return (
    <Box w={200} ml={20} mt={20}>
      <Styled />
      <Slider
        min={0}
        max={labels.length - 1}
        value={value}
        className="custom-slider"
        handleClassName="custom-slider-handle"
        graduated
        tooltip={false}
        handleTitle={labels[value]}
        onChange={setValue}
      />
    </Box>
  );
};

const Styled = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
          .custom-slider-handle {
            background: linear-gradient(45deg, #4CAF50, #2196F3);
            transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
            text-align: center;
            border-radius: 4px;
            padding-inline: 6px;
            padding-block: 2px;
            width: 32px;
            top: -8px;
            margin-left: -16px;
            color: white;
            font-size: 12px;
            cursor: pointer;

            &:hover {
              box-shadow: var(--rs-slider-thumb-hover-shadow);
            }

            &::before {
              display: none;
            }
          }
        `
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!-- end-code -->
