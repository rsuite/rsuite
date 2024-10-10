<!--start-code-->

```js
import { Animation, Button } from 'rsuite';

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

const App = () => {
  const [show, setShow] = React.useState(true);
  const onChange = () => setShow(!show);

  return (
    <div className="row">
      <Styles />
      <Button onClick={onChange}>transition</Button>
      <hr />
      <Animation.Transition
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
        in={show}
      >
        {(props, ref) => <Panel {...props} ref={ref} />}
      </Animation.Transition>
    </div>
  );
};

function Styles() {
  return (
    <style>{`
      .custom-exiting,
      .custom-entering {
        animation: 0.3s linear;
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

      .zoomIn {
        animation-name: zoomIn;
      }
    `}</style>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
