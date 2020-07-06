### 组合

<!--start-code-->

```js

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div style={{width: 160}}>
          <InputNumber prefix="$"/>
          <hr/>
          <InputNumber postfix="￥"/>
          <hr/>
          <InputNumber postfix="%"/>
        </div>
        <hr/>
        <InputGroup style={{width: 180}}>
          <InputGroup.Addon
            style={{cursor: "pointer"}}
            onClick={(e: any) => {
              this._InputNumber.handleMinus();
            }}
          >-</InputGroup.Addon>
          <InputNumber
            className={'custom-input-number'}
            ref={ref => (this._InputNumber = ref)}
            max={99}
            min={1}
          />
          <InputGroup.Addon
            style={{cursor: "pointer"}}
            onClick={(e: any) => {
              this._InputNumber.handlePlus();
            }}
          >+</InputGroup.Addon>
        </InputGroup>
      </div>
    )
  }
}
ReactDOM.render(<Demo/>);

/**
.custom-input-number {
  input {
    text-align: center;
  }

  .rs-input-number-btn-group-vertical {
    display: none;
  }
}
**/

```

<!--end-code-->
