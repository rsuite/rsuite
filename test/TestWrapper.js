/**
 * https://stackoverflow.com/questions/36682241/testing-functional-components-with-renderintodocument
 */
import React from 'react';

class Wrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

export default Wrapper;
