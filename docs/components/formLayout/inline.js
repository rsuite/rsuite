var formLayoutInstance = (
    <Form inline>
        <FormGroup controlId='username'>
            <ControlLabel>Username</ControlLabel>
            <FormControl  type='text'  />
        </FormGroup>
        <FormGroup controlId='Password'>
            <ControlLabel>Password</ControlLabel>
            <FormControl  type='password'  />
        </FormGroup>

        <Button type="submit" shape="default">
           Submit
        </Button>
    </Form>
);
ReactDOM.render(formLayoutInstance, mountNode);
