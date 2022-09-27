import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'rsuite';
import './styles/index.less';

function HelloMessage({ name }) {
  return (
    <div>
      <p>Hello {name}</p>
      <Button appearance="primary">test</Button>
    </div>
  );
}

var mountNode = document.getElementById('app');
ReactDOM.render(<HelloMessage name="React Suite" />, mountNode);
