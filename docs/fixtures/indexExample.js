const userModel = SchemaModel({
    username: StringType().isRequired('Required'),
    email: StringType().isEmail('Incorrect Email format'),
    gender: StringType().isRequired('Required'),
    skills: ArrayType().minLength(2, 'Select at least two').isRequired('Required'),
    bio: StringType().rangeLength(0, 200, '200 character maximum'),
});

const FormExample = React.createClass({
    PropTypes: {
        errors: React.PropTypes.obejct,
        data: React.PropTypes.data
    },
    getInitialState() {
        return {
            data: {}
        };
    },
    handleSubmit() {
        const { formData, isValid } = this.refs.form.get();
        console.log(formData, isValid);
    },
    render() {

        return (
            <div className="container">
                <h1 className="page-title">Form Example</h1>
                <RSuiteForm ref="form"
                    model={userModel}
                    errors = {this.props.errors}
                    formData={this.state.data}
                    >
                    <Field name="username" >
                        <FormGroup>
                            <ControlLabel>Text</ControlLabel>
                            <FormControl  type='text'  />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                    </Field>

                    <Field name="email" >
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl  type='text'  />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                    </Field>

                    <Field name="gender" >
                        <FormGroup>
                            <ControlLabel>Gender</ControlLabel>
                            <RadioList >
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                            </RadioList>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                    </Field>

                    <Field name="skills" >
                        <FormGroup>
                            <ControlLabel>Skills</ControlLabel>
                            <CheckboxList >
                                <Checkbox value="javascript">javascript</Checkbox>
                                <Checkbox value="css">css</Checkbox>
                                <Checkbox value="react">react</Checkbox>
                            </CheckboxList>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                    </Field>

                    <Field name="bio" >
                        <FormGroup>
                            <ControlLabel>Bio</ControlLabel>
                            <FormControl componentClass="textarea" />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                    </Field>

                    <Button shape="primary" onClick={this.handleSubmit}>Submit</Button>

                </RSuiteForm>
            </div>
        );
    }
});

ReactDOM.render(<FormExample />, mountNode);
