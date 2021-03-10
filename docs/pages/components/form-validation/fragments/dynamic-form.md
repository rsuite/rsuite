<!--start-code-->

```js
const { ArrayType, StringType, NumberType, ObjectType } = Schema.Types;
const model = Schema.Model({
  order: ArrayType().of(
    ObjectType().shape({
      name: StringType().isRequired('This field is required.'),
      quantity: NumberType().isRequired('This field is required.')
    })
  )
});

const ErrorMessage = ({ children }) => <span style={{ color: 'red' }}>{children}</span>;
const Cell = ({ children }) => <td style={{ padding: '2px 4px' }}>{children}</td>;

const OrderRow = ({ rowValue = {}, onChange, rowIndex, rowError }) => {
  const handleChangeName = value => {
    onChange(rowIndex, { ...rowValue, name: value });
  };
  const handleChangeAmount = value => {
    onChange(rowIndex, { ...rowValue, quantity: value });
  };

  return (
    <tr>
      <Cell>
        <Input value={rowValue.name} onChange={handleChangeName} />
        {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
      </Cell>
      <Cell>
        <InputNumber
          value={rowValue.quantity}
          onChange={handleChangeAmount}
          style={{ width: 100 }}
        />
        {rowError ? <ErrorMessage>{rowError.quantity.errorMessage}</ErrorMessage> : null}
      </Cell>
    </tr>
  );
};

const OrderInputControl = ({ value = [], onChange, fieldError }) => {
  const errors = fieldError ? fieldError.array : [];
  const [orders, setOrders] = React.useState(value);
  const handleChange = (rowIndex, value) => {
    const nextOrders = [...orders];
    nextOrders[rowIndex] = value;
    setOrders(nextOrders);
    onChange(nextOrders);
  };

  const handleMinus = () => {
    setOrders(orders.slice(0, -1));
  };
  const handleAdd = () => {
    setOrders(orders.concat([{ name: '', quantity: null }]));
  };
  return (
    <table cellPadding={4}>
      <thead>
        <tr>
          <td>Name</td>
          <td>Quantity</td>
        </tr>
      </thead>
      <tbody>
        {orders.map((rowValue, index) => (
          <OrderRow
            key={index}
            rowIndex={index}
            rowValue={rowValue}
            rowError={errors[index] ? errors[index].object : null}
            onChange={handleChange}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>
            <ButtonGroup>
              <Button onClick={handleAdd}>+</Button>
              <Button onClick={handleMinus}>-</Button>
            </ButtonGroup>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

const App = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    order: [{ name: '', quantity: null }]
  });

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Form.Control name="order" accepter={OrderInputControl} fieldError={formError['order']} />
        </Form>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={12}>
        <JSONView formValue={formValue} formError={formError} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
