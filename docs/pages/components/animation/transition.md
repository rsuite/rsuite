### Transition 自定义过渡效果

在 Transition 中配置以下 className, 然后自定义相关 css 动画处理。

```
exitedClassName="custom-exited"
exitingClassName="custom-exiting"
enteredClassName="custom-entered"
enteringClassName="custom-entering"
```

<!--start-code-->

```js
const Panel = React.forwardRef(({ ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    style={{
      background: '#000',
      width: 100,
      overflow: 'hidden'
    }}
  >
    <p>Panel</p>
    <p>Content Content Content</p>
  </div>
));

class TransitionDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      show: true
    };
  }

  handleToggle() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div className="row">
        <Button onClick={this.handleToggle}>toggle</Button>
        <hr />
        <Transition
          exitedClassName="custom-exited"
          exitingClassName="custom-exiting"
          enteredClassName="custom-entered"
          enteringClassName="custom-entering"
          onEnter={() => {
            console.log('onEnter');
          }}
          onEntering={() => {
            console.log('onEntering');
          }}
          onEntered={() => {
            console.log('onEntered');
          }}
          onExit={() => {
            console.log('onExit');
          }}
          onExiting={() => {
            console.log('onExiting');
          }}
          onExited={() => {
            console.log('onExited');
          }}
          in={this.state.show}
        >
          {(props, ref) => <Panel {...props} ref={ref} />}
        </Transition>
      </div>
    );
  }
}

ReactDOM.render(<TransitionDemo />);

/**
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}

.custom-exiting,
.custom-entering {
  animation: .3s linear;
  animation-fill-mode: forwards;
}

.custom-exiting {
  animation-name: zoomOut;
}

.custom-entering {
  animation-name: zoomIn;
}

.custom-entered {
  opacity: 1;
}

.custom-exited {
  opacity: 0;
}
**/
```

<!--end-code-->
