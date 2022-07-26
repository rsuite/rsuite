<!--start-code-->

```js
import { Tooltip, Whisper, Button } from 'rsuite';

const CustomComponent = ({ placement }) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={
      <Tooltip>This is a ToolTip for simple text hints. It can replace the title property</Tooltip>
    }
  >
    <Button appearance="subtle">{placement}</Button>
  </Whisper>
);

const App = () => (
  <>
    <table className="placement-table" cellSpacing={5}>
      <tbody>
        <tr>
          <td />
          <td>
            <CustomComponent placement="topStart" />
          </td>
          <td>
            <CustomComponent placement="top" />
          </td>
          <td>
            <CustomComponent placement="topEnd" />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <CustomComponent placement="leftStart" />
          </td>
          <td />
          <td />
          <td />
          <td>
            <CustomComponent placement="rightStart" />
          </td>
        </tr>
        <tr>
          <td>
            <CustomComponent placement="left" />
          </td>
          <td />
          <td />
          <td />
          <td>
            <CustomComponent placement="right" />
          </td>
        </tr>

        <tr>
          <td>
            <CustomComponent placement="leftEnd" />
          </td>
          <td />
          <td />
          <td />
          <td>
            <CustomComponent placement="rightEnd" />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <CustomComponent placement="bottomStart" />
          </td>
          <td>
            <CustomComponent placement="bottom" />
          </td>
          <td>
            <CustomComponent placement="bottomEnd" />
          </td>
          <td />
        </tr>
      </tbody>
    </table>
    <hr />

    <CustomComponent placement="auto" />
    <br />
    <CustomComponent placement="autoVertical" />
    <CustomComponent placement="autoVerticalStart" />
    <CustomComponent placement="autoVerticalEnd" />

    <br />
    <CustomComponent placement="autoHorizontal" />
    <CustomComponent placement="autoHorizontalStart" />
    <CustomComponent placement="autoHorizontalEnd" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
