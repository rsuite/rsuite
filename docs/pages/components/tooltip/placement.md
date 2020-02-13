### 位置

- `left` , `top` , `right` , `bottom` 是物理中的 4 个方向, 表示显示的位置。
- `leftStart` , 在 left 后面加了一个 start, 这里的 start 是逻辑方式，表示对齐方式是 Y 轴的开始。

> 有关 `start` 和 `end` 的描述可参照 W3C 关于 [CSS逻辑属性和值（CSS Logical Properties and Values Level 1）](https://www.w3.org/TR/2017/WD-css-logical-1-20170518/) 的首份工作草案（First Public Working Draft）

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
