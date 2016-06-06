var instance = (
    <Form >
        <FormGroup controlId='username'>
            <ControlLabel>Text</ControlLabel>
            <FormControl  type='text'  />
            <HelpBlock>Required</HelpBlock>
        </FormGroup>
        <FormGroup controlId='email'>
            <ControlLabel>Email</ControlLabel>
            <FormControl  type='email'  />
        </FormGroup>
        <FormGroup controlId='number'>
            <ControlLabel>Number</ControlLabel>
            <FormControl  type='number'  />
        </FormGroup>
        <FormGroup controlId='file'>
            <ControlLabel>File</ControlLabel>
            <FormControl  type='file' />
        </FormGroup>

        <FormGroup controlId='select'>
            <ControlLabel>Select</ControlLabel>
            <FormControl componentClass='select'>
                <option value='A'>Option A</option>
                <option value='B'>Option B</option>
                <option value='C'>Option C</option>
                <option value='D'>Option D</option>
            </FormControl>
        </FormGroup>

        <FormGroup controlId='textarea'>
            <ControlLabel>Textarea</ControlLabel>
            <FormControl componentClass="textarea" />
        </FormGroup>

        <FormGroup controlId='checkbox'>
            <Checkbox checked > Checkbox</Checkbox>
        </FormGroup>

        <FormGroup>
            <Radio> Radio</Radio>
        </FormGroup>

        <FormGroup controlId='checkboxList'>
            <ControlLabel>CheckboxList</ControlLabel>
            <CheckboxList name="checkboxList">
                <Checkbox checked>Item A</Checkbox>
                <Checkbox>Item B</Checkbox>
                <Checkbox>Item C</Checkbox>
                <Checkbox disabled>Item D</Checkbox>
            </CheckboxList>
        </FormGroup>

        <FormGroup controlId='radioList'>
            <ControlLabel>RadioList</ControlLabel>
            <RadioList name="radioList">
                <Radio checked>Item A</Radio>
                <Radio>Item B</Radio>
                <Radio>Item C</Radio>
                <Radio disabled>Item D</Radio>
            </RadioList>
        </FormGroup>
    </Form>
);
ReactDOM.render(instance, mountNode);
