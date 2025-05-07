<!--start-code-->

```js
import {
  Form,
  Button,
  ButtonGroup,
  ButtonToolbar,
  NumberInput,
  Panel,
  Input,
  Row,
  Col,
  IconButton,
  Box
} from 'rsuite';
import { SchemaModel, ArrayType, StringType, NumberType, ObjectType } from 'rsuite/Schema';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import JSONTree from 'react-json-tree';

const JSONView = ({ formValue, formError }) => (
  <Box mb={10}>
    <Panel className="json-tree-wrapper" header={<p>formValue</p>}>
      <JSONTree data={formValue} />
    </Panel>

    <Panel className="json-tree-wrapper" header={<p>formError</p>}>
      <JSONTree data={formError} />
    </Panel>
  </Box>
);

const model = SchemaModel({
  orderId: StringType().minLength(6, 'Minimum 6 characters required').isRequired('Required.'),
  products: ArrayType().of(
    ObjectType().shape({
      name: StringType().minLength(6, 'Minimum 6 characters required').isRequired('Required.'),
      quantity: NumberType().isRequired('Required.')
    })
  )
});

const ErrorMessage = ({ children }) => (
  <Box as="span" c="red">
    {children}
  </Box>
);

const Cell = ({ children, style, ...rest }) => (
  <Box as="td" p="2px 4px 2px 0" style={style} {...rest}>
    {children}
  </Box>
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
        <Input value={rowValue.name} onChange={handleChangeName} w={196} />
        {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
      </Cell>
      <Cell>
        <NumberInput min={0} value={rowValue.quantity} onChange={handleChangeAmount} w={100} />
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
    <Row>
      <Col span={{ xs: 24, md: 12 }}>
        <Form
          ref={form}
          checkTrigger="change"
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Form.Stack>
            <Form.Group controlId="orderId">
              <Form.Label>Order ID</Form.Label>
              <Form.Control name="orderId" accepter={Input} errorMessage={formError.orderId} />
            </Form.Group>
            <Form.Control
              name="products"
              accepter={ProductInputControl}
              fieldError={formError.products}
            />
          </Form.Stack>

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
      </Col>
      <Col hidden={{ md: true }} span={{ xs: 24, md: 12 }}>
        <JSONView formValue={formValue} formError={formError} />
      </Col>
    </Row>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
