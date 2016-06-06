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
