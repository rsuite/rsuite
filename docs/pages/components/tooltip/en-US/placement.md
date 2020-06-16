### Placement

- `left` , `top` , `right` , `bottom` is in 4 directions, indicating the location of the display.
- `leftStart` , A start is added to the left, and here start is a logical way, indicating that the alignment is the beginning of the Y axis.

> For a description of start and end, refer to W3C first public working draft about [CSS Logical Properties and Values Level 1](https://www.w3.org/TR/2017/WD-css-logical-1-20170518/).

<!--start-code-->

```js
const CustomComponent = ({ placement }) => (
  <Whisper
    trigger="click"
    placement={placement}
    speaker={
      <Tooltip>
        This is a ToolTip for simple text hints. It can replace the title
        property
      </Tooltip>
    }
  >
    <Button appearance="subtle">{placement}</Button>
  </Whisper>
);

const instance = (
  <div>
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
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
