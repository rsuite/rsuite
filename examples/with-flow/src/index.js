// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'rsuite';

import 'rsuite/styles/index.less';

type Props = {
  text: string
};

type State = {
  count: number
};

class CountButton extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }
  handleClick = (event: SyntheticEvent<*>) => {
    this.setState({
      count: this.state.count + 1
    });
  };
  render() {
    const { count } = this.state;
    const { text } = this.props;
    return (
      <Button onClick={this.handleClick} size="lg">
        {text} {count}
      </Button>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div style={{ padding: 20 }}>
        <CountButton text="Plus" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
