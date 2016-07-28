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

        <FormGroup controlId='checkboxList'>
            <ControlLabel>CheckboxList</ControlLabel>
            <CheckboxList name="checkboxList" inline>
                <Checkbox checked>Item A</Checkbox>
                <Checkbox>Item B</Checkbox>
            </CheckboxList>
        </FormGroup>

        <Button type="submit" shape="default">
           Submit
        </Button>
    </Form>
);
ReactDOM.render(formLayoutInstance, mountNode);
