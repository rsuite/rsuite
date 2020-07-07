### Combination

<!--start-code-->

```js
const App = () => {
  const inputRef = React.createRef();
  const handleMinus = () => {
    inputRef.current.handleMinus();
  };
  const handlePlus = () => {
    inputRef.current.handlePlus();
  };
  return (
     <div style={{width: 160}}>
       <InputNumber prefix="$"/>
       <hr/>
       <InputNumber postfix="￥"/>
       <hr/>
       <InputNumber postfix="%"/>
       <hr/>
       <InputGroup>
         <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
         <InputNumber
           className={'custom-input-number'}
           ref={inputRef}
           max={99}
           min={1}
         />
         <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
       </InputGroup>
     </div>
    )
}
ReactDOM.render(<App/>);


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
