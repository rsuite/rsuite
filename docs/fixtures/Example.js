import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Link } from 'react-router';
//import { transform } from 'babel-standalone';
import CodeEditor from './CodeEditor';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/jsx/jsx';

import * as RForm  from 'rsuite-form';
import * as Schema from 'rsuite-schema';

const RSuiteForm = RForm.Form;
const Field = RForm.Field;
const SchemaModel = Schema.SchemaModel;
const StringType = Schema.StringType;
const ArrayType = Schema.ArrayType;

// Buttons
const Button = require('../../src/Button').default;
const ButtonToolbar = require('../../src/ButtonToolbar').default;
const Dropdown = require('../../src/Dropdown').default;
const ButtonGroup = require('../../src/ButtonGroup').default;


// Whisper
const Whisper = require('../../src/Whisper').default;
const Tooltip = require('../../src/Tooltip').default;
const Popover = require('../../src/Popover').default;

// Modal
const Modal = require('../../src/Modal').default;


// Nav
const Nav = require('../../src/Nav').default;
const Navbar = require('../../src/Navbar').default;
const Breadcrumb = require('../../src/Breadcrumb').default;
const Pagination = require('../../src/Pagination').default;


// Form
const Form = require('../../src/Form').default;
const FormGroup = require('../../src/FormGroup').default;
const ControlLabel = require('../../src/ControlLabel').default;
const FormControl = require('../../src/FormControl').default;
const HelpBlock = require('../../src/HelpBlock').default;
const Checkbox = require('../../src/Checkbox').default;
const CheckboxList = require('../../src/CheckboxList').default;
const InputGroup = require('../../src/InputGroup').default;
const TextList = require('../../src/TextList').default;


const Radio = require('../../src/Radio').default;
const RadioList = require('../../src/RadioList').default;
const IconFont = require('../../src/IconFont').default;

//Layout
const Header = require('../../src/Header').default;
const Sidebar = require('../../src/Sidebar').default;
const Grid = require('../../src/Grid').default;
const Row = require('../../src/Row').default;
const Col = require('../../src/Col').default;
const Table = require('../../src/Table').default;
const Container = require('../../src/Container').default;
const Content = require('../../src/Content').default;
const Panel = require('../../src/Panel').default;
const PanelGroup = require('../../src/PanelGroup').default;


const Anchor = require('../../src/Anchor').default;


const Example = React.createClass({
    propTypes: {
        code: React.PropTypes.string.isRequired,
        renderCode: React.PropTypes.bool,
        id: React.PropTypes.string,
        isBanner: React.PropTypes.bool
    },
    getInitialState: function () {
        return {
            code: this.props.code
        };
    },


    executeCode: function () {

        const mountNode = this.refs.example;
        const originalRender = ReactDOM.render;

        ReactDOM.render = (element) => this._initialExample = element;

        try {

            let code = Babel.transform(this.state.code, {
                presets: ['stage-0', 'react', 'es2015']
            }).code;

            if (this.props.renderCode) {
                ReactDOM.render(<CodeEditor code={code} readOnly={true} />, mountNode);
            } else {

                /* eslint-disable */
                eval(code);
                /* eslint-enable */
            }
        } catch (err) {
            console.log(err);
        } finally {
            ReactDOM.render = originalRender;
        }
    },

    handleCodeChange: function (val) {
        this.setState({ code: val });
        this.executeCode();
    },
    renderExample() {

        let example = (
            <div>{this._initialExample}</div>
        );
        return (
            <div className={classNames('doc-example', this.props.exampleClassName) }>
                {example}
            </div>
        );
    },
    render: function () {
        this.executeCode();

        if (this.props.isBanner) {
            return (
                <Col id={this.props.id} className="banner"  xsHidden>
                    <div className="triangle-left">
                        {this.renderExample() }
                    </div>
                    <div className="container">
                        {this.props.children}
                        <div className="typing-wrapper">
                            <CodeEditor
                                key='jsx'
                                onChange={this.handleCodeChange}
                                className='doc-code'
                                theme='base16-dark'
                                code={this.state.code}
                                />
                        </div>
                    </div>
                </Col>
            );
        }

        return (
            <div className='doc-example-wrapper'>
                {this.renderExample() }
                <CodeEditor
                    key='jsx'
                    onChange={this.handleCodeChange}
                    className='doc-code'
                    theme='base16-light'
                    code={this.state.code}
                    />
            </div>
        );
    }
});
export default Example;
