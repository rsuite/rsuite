import { Component } from 'preact';
import style from './style';
import { Button, Message } from 'rsuite';
import React from 'preact/compat';

export default class Profile extends Component {
  state = {
    time: Date.now(),
    count: 10
  };

  // update the current time
  updateTime = () => {
    this.setState({ time: Date.now() });
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // gets called when this route is navigated to
  componentDidMount() {
    // start a timer for the clock:
    this.timer = setInterval(this.updateTime, 1000);
  }

  // gets called just before navigating away from the route
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // Note: `user` comes from the URL, courtesy of our router
  render({ user }, { time, count }) {
    return (
      <div class={style.profile}>
        <Message showIcon type="info" description="Preact with RSuite UI." />
        <h1>Profile: {user}</h1>
        <div>Current time: {new Date(time).toLocaleString()}</div>
        <p>
          <Button appearance="ghost" onClick={this.increment}>Click Me</Button> Clicked {count} times.
        </p>
      </div>
    );
  }
}
