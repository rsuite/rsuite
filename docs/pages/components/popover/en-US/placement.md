### Placement

<!--start-code-->

```js
const Speaker = ({ content, ...props }) => {
  return (
    <Popover title="Title" {...props}>
      <p>This is a Popover </p>
      <p>{content}</p>
    </Popover>
  );
};

const CustomComponent = ({ placement }) => (
  <Whisper
    trigger="click"
    placement={placement}
    speaker={<Speaker content={`I am positioned to the ${placement}`} />}
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
