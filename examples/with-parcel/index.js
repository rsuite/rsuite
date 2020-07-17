import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'rsuite';
import './styles/index.less';
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <p>Hello {this.props.name}</p>
        <Button appearance="primary">test</Button>
      </div>
    );
  }
}

var mountNode = document.getElementById('app');
ReactDOM.render(<HelloMessage name="React Suite" />, mountNode);
