import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';


const CodeEditor = React.createClass({
    propTypes: {
        readOnly: React.PropTypes.bool,
        code: React.PropTypes.string,
        theme: React.PropTypes.string
    },

    componentDidMount: function () {
        if (CodeMirror === undefined) {
            return;
        }

        this.editor = CodeMirror.fromTextArea(this.refs.editor, {
            mode: 'jsx',
            lineNumbers: false,
            lineWrapping: false,
            matchBrackets: true,
            tabSize: 2,
            theme: this.props.theme || 'default',
            readOnly: this.props.readOnly
        });

        this.editor.on('change', this.handleChange);
    },

    componentDidUpdate: function () {
        if (this.props.readOnly) {
            this.editor.setValue(this.props.code);
        }
    },

    handleChange: function () {
        if (!this.props.readOnly && this.props.onChange) {
            this.props.onChange(this.editor.getValue());
        }
    },

    render: function () {

        return (
            <div style={this.props.style} className={this.props.className}>
                <textarea ref='editor' defaultValue={this.props.code} />
            </div>
        );
    }
});

export default CodeEditor;

