<!--start-code-->

```js
import { Popover, Whisper, Button, Toggle } from 'rsuite';

const DefaultPopover = React.forwardRef(({ content, ...props }, ref) => {
  return (
    <Popover ref={ref} title="Title" {...props}>
      <p>This is a Popover </p>
      <p>{content}</p>
    </Popover>
  );
});

const PopoverWithLoader = React.forwardRef((props, ref) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Popover ref={ref} {...props}>
      {loading ? (
        <Loader content="Loading..." />
      ) : (
        <div>
          <p>This is a Popover.</p>
          <p>The loading content is loaded.</p>
        </div>
      )}
    </Popover>
  );
});

const CustomComponent = ({ placement, loading, children }) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={
      loading ? (
        <PopoverWithLoader />
      ) : (
        <DefaultPopover content={`I am positioned to the ${placement}`} />
      )
    }
  >
    <Button appearance="subtle">{children || placement}</Button>
  </Whisper>
);

const App = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <label>Dynamic content: </label>
      <Toggle onChange={setLoading} />
      <hr />
      <table className="placement-table" cellSpacing={5}>
        <tbody>
          <tr>
            <td />
            <td>
              <CustomComponent placement="topStart" loading={loading} />
            </td>
            <td>
              <CustomComponent placement="top" loading={loading} />
            </td>
            <td>
              <CustomComponent placement="topEnd" loading={loading} />
            </td>
            <td />
          </tr>
          <tr>
            <td>
              <CustomComponent placement="leftStart" loading={loading} />
            </td>
            <td />
            <td />
            <td />
            <td>
              <CustomComponent placement="rightStart" loading={loading} />
            </td>
          </tr>
          <tr>
            <td>
              <CustomComponent placement="left" loading={loading} />
            </td>
            <td />
            <td />
            <td />
            <td>
              <CustomComponent placement="right" loading={loading} />
            </td>
          </tr>

          <tr>
            <td>
              <CustomComponent placement="leftEnd" loading={loading} />
            </td>
            <td />
            <td />
            <td />
            <td>
              <CustomComponent placement="rightEnd" loading={loading} />
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <CustomComponent placement="bottomStart" loading={loading} />
            </td>
            <td>
              <CustomComponent placement="bottom" loading={loading} />
            </td>
            <td>
              <CustomComponent placement="bottomEnd" loading={loading} />
            </td>
            <td />
          </tr>
        </tbody>
      </table>
      <hr />

      <CustomComponent placement="auto" loading={loading} />
      <br />
      <CustomComponent placement="autoVertical" loading={loading} />
      <CustomComponent placement="autoVerticalStart" loading={loading} />
      <CustomComponent placement="autoVerticalEnd" loading={loading} />

      <br />
      <CustomComponent placement="autoHorizontal" loading={loading} />
      <CustomComponent placement="autoHorizontalStart" loading={loading} />
      <CustomComponent placement="autoHorizontalEnd" loading={loading} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
