var formLayoutInstance = (
    <Form horizontal>
        <FormGroup controlId='username'>
            <Col md={2} componentClass={ControlLabel} >
                Username
            </Col>
            <Col md={10}>
                <FormControl  type='text'  />
            </Col>
        </FormGroup>
        <FormGroup controlId='Password'>
            <Col md={2} componentClass={ControlLabel} >
                Password
            </Col>
            <Col md={10}>
               <FormControl  type='password'  />
            </Col>
        </FormGroup>

        <FormGroup controlId='radioList'>
            <Col md={2} componentClass={ControlLabel} >
                RadioList
            </Col>
            <Col md={10}>
                 <RadioList name="radioList">
                    <Radio checked>Item A</Radio>
                    <Radio>Item B</Radio>
                    <Radio>Item C</Radio>
                    <Radio disabled>Item D</Radio>
                </RadioList>
            </Col>
        </FormGroup>

        <FormGroup controlId='radioList'>
            <Col md={2} componentClass={ControlLabel} >
                RadioList
            </Col>
            <Col md={10}>
                 <RadioList name="radioList" inline>
                    <Radio checked>Item A</Radio>
                    <Radio>Item B</Radio>
                    <Radio>Item C</Radio>
                    <Radio disabled>Item D</Radio>
                </RadioList>
            </Col>
        </FormGroup>

        <FormGroup controlId='checkboxList'>
            <Col md={2} componentClass={ControlLabel} >
                CheckboxList
            </Col>
            <Col md={10}>
                 <CheckboxList name="checkboxList" inline>
                    <Checkbox checked>Item A</Checkbox>
                    <Checkbox>Item B</Checkbox>
                    <Checkbox>Item C</Checkbox>
                    <Checkbox disabled>Item D</Checkbox>
                </CheckboxList>
            </Col>
        </FormGroup>

        <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit" shape="default">
                    Submit
                </Button>
            </Col>
        </FormGroup>

    </Form>
);
ReactDOM.render(formLayoutInstance, mountNode);
