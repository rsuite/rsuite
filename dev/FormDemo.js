import React from 'react';
import { Form, Field } from 'rsuite-form';
import { SchemaModel, StringType, ArrayType } from 'rsuite-schema';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    TextList,
    HelpBlock,
    Button,
    RadioList,
    CheckboxList,
    Checkbox,
    InputGroup,
    IconFont,
    Radio
} from '../src';

const myModel = SchemaModel({
    username: StringType().isOneOf(['username', 'email'], '只能输入username,email').isRequired('该字段必填'),
    email: StringType().isEmail('邮件格式错误'),
    lables: ArrayType().minLength(2, '至少选择两项').shape(StringType().isOneOf(['数码', '体育', '游戏', '旅途', '其他']), '只能输入：数码,体育,游戏,旅途,其他').unrepeatable('不能重复'),
    radioList: StringType().isRequired('该字段必填'),
    radio: StringType().isRequired('该字段必填'),
    checkboxList: ArrayType().minLength(2, '至少选择2项').isRequired('该字段必填'),
    checkbox: StringType().isRequired('该字段必填')
});

const FormDemo = React.createClass({
    getInitialState() {
        return {
            data: {},
            formValid: false
        };
    },
    handleSubmit() {
        this.setState({
            formValid: true
        });

        console.log(
            this.state.data,
            this.refs.myForm.getCheckResult(),
            this.refs.myForm.isValid()
        );
    },
    render() {


        return (
            <div className="container">
                <h1 className="page-title">表单验证</h1>
                <Form ref="myForm" model={myModel} force={this.state.formValid}   formData={this.state.data} >
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
                            <InputGroup inside size="lg">
                                <InputGroup.Addon>
                                    <IconFont icon="user" />
                                </InputGroup.Addon>
                                <FormControl  type='text'  />
                            </InputGroup>
                            <HelpBlock>邮件地址</HelpBlock>
                        </FormGroup>
                    </Field>

                    <Field name="lables" >
                        <FormGroup>
                            <ControlLabel>Lables</ControlLabel>
                            <TextList />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                    </Field>

                    <Field name="radioList" >
                        <FormGroup>
                            <ControlLabel>radioList</ControlLabel>
                            <RadioList name="radioList">
                                <Radio value="A">Item A</Radio>
                                <Radio value="B">Item B</Radio>
                                <Radio value="C">Item C</Radio>
                            </RadioList>
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                    </Field>



                    <Field name="checkboxList" >
                        <FormGroup>
                            <ControlLabel>CheckboxList</ControlLabel>
                            <CheckboxList name="radioList">
                                <Checkbox value="A">Item A</Checkbox>
                                <Checkbox value="B">Item B</Checkbox>
                                <Checkbox value="C">Item C</Checkbox>
                            </CheckboxList>
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                    </Field>


                    <Button shape="primary" onClick={this.handleSubmit}>提交</Button>
                </Form>
            </div>
        );
    }
});

export default FormDemo;
