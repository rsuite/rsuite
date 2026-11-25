<!--start-code-->

```js
import { Input, InputGroup, Grid, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const styles = {
  marginBottom: 10
};

const CustomInput = ({ ...props }) => <Input {...props} style={styles} />;

const CustomInputGroup = ({ placeholder, ...props }) => (
  <InputGroup {...props} style={styles}>
    <Input placeholder={placeholder} />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
  </InputGroup>
);

const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
  <InputGroup {...props} inside style={styles}>
    <Input placeholder={placeholder} />
    <InputGroup.Button>
      <SearchIcon />
    </InputGroup.Button>
  </InputGroup>
);

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={24} sm={12} md={8}>
        <CustomInput size="lg" placeholder="Large" />
        <CustomInput size="md" placeholder="Medium" />
        <CustomInput size="sm" placeholder="Small" />
        <CustomInput size="xs" placeholder="Xsmall" />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <CustomInputGroup size="lg" placeholder="Large" />
        <CustomInputGroup size="md" placeholder="Medium" />
        <CustomInputGroup size="sm" placeholder="Small" />
        <CustomInputGroup size="xs" placeholder="Xsmall" />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <CustomInputGroupWidthButton size="lg" placeholder="Large" />
        <CustomInputGroupWidthButton size="md" placeholder="Medium" />
        <CustomInputGroupWidthButton size="sm" placeholder="Small" />
        <CustomInputGroupWidthButton size="xs" placeholder="Xsmall" />
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
