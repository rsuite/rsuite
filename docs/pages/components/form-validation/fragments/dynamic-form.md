<!--start-code-->

```js
import {
  Form,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Schema,
  InputNumber,
  Panel,
  Input,
  FlexboxGrid,
  IconButton
} from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import JSONTree from 'react-json-tree';

const JSONView = ({ formValue, formError }) => (
  <div style={{ marginBottom: 10 }}>
    <Panel className="json-tree-wrapper" header={<p>formValue</p>}>
      <JSONTree data={formValue} />
    </Panel>

    <Panel className="json-tree-wrapper" header={<p>formError</p>}>
      <JSONTree data={formError} />
    </Panel>
  </div>
);

const { ArrayType, StringType, NumberType, ObjectType } = Schema.Types;
const model = Schema.Model({
  orderId: StringType().minLength(6, 'Minimum 6 characters required').isRequired('Required.'),
  products: ArrayType().of(
    ObjectType().shape({
      name: StringType().minLength(6, 'Minimum 6 characters required').isRequired('Required.'),
      quantity: NumberType().isRequired('Required.')
    })
  )
});

const ErrorMessage = ({ children }) => <span style={{ color: 'red' }}>{children}</span>;
const Cell = ({ children, style, ...rest }) => (
  <td style={{ padding: '2px 4px 2px 0', verticalAlign: 'top', ...style }} {...rest}>
    {children}
  </td>
);

const ProductItem = ({ rowValue = {}, onChange, rowIndex, rowError }) => {
  const handleChangeName = value => {
    onChange(rowIndex, { ...rowValue, name: value });
  };
  const handleChangeAmount = value => {
    onChange(rowIndex, { ...rowValue, quantity: value });
  };

  return (
    <tr>
      <Cell>
        <Input value={rowValue.name} onChange={handleChangeName} style={{ width: 196 }} />
        {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
      </Cell>
      <Cell>
        <InputNumber
          min={0}
          value={rowValue.quantity}
          onChange={handleChangeAmount}
          style={{ width: 100 }}
        />
        {rowError ? <ErrorMessage>{rowError.quantity.errorMessage}</ErrorMessage> : null}
      </Cell>
    </tr>
  );
};

const ProductInputControl = ({ value = [], onChange, fieldError }) => {
  const errors = fieldError ? fieldError.array : [];
  const [products, setProducts] = React.useState(value);
  const handleChangeProducts = nextProducts => {
    setProducts(nextProducts);
    onChange(nextProducts);
  };
  const handleInputChange = (rowIndex, value) => {
    const nextProducts = [...products];
    nextProducts[rowIndex] = value;
    handleChangeProducts(nextProducts);
  };

  const handleMinus = () => {
    handleChangeProducts(products.slice(0, -1));
  };
  const handleAdd = () => {
    handleChangeProducts(products.concat([{ name: '', quantity: null }]));
  };
  return (
    <table>
      <thead>
        <tr>
          <Cell>Product Name</Cell>
          <Cell>Quantity</Cell>
        </tr>
      </thead>
      <tbody>
        {products.map((rowValue, index) => (
          <ProductItem
            key={index}
            rowIndex={index}
            rowValue={rowValue}
            rowError={errors[index] ? errors[index].object : null}
            onChange={handleInputChange}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <Cell colSpan={2} style={{ paddingTop: 10 }}>
            <ButtonGroup size="xs">
              <IconButton onClick={handleAdd} icon={<PlusIcon />} />
              <IconButton onClick={handleMinus} icon={<MinusIcon />} />
            </ButtonGroup>
          </Cell>
        </tr>
      </tfoot>
    </table>
  );
};

const App = () => {
  const form = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    orderId: '',
    products: [{ name: '', quantity: null }]
  });

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <Form
          ref={form}
          checkTrigger="change"
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Form.Group controlId="orderId">
            <Form.ControlLabel>Order ID</Form.ControlLabel>
            <Form.Control name="orderId" accepter={Input} errorMessage={formError.orderId} />
          </Form.Group>
          <Form.Control
            name="products"
            accepter={ProductInputControl}
            fieldError={formError.products}
          />

          <hr />
          <ButtonToolbar>
            <Button
              appearance="primary"
              onClick={() => {
                form.current.check();
              }}
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                setFormError({});
              }}
            >
              Clear Errors
            </Button>
          </ButtonToolbar>
        </Form>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={12}>
        <JSONView formValue={formValue} formError={formError} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
