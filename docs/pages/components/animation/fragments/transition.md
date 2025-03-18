<!--start-code-->

```js
import { Animation, Button, ButtonToolbar, Card } from 'rsuite';

const AnimatedPanel = React.forwardRef(({ ...props }, ref) => (
  <Card
    {...props}
    ref={ref}
    shaded
    bordered={false}
    w={240}
    h={120}
    c="white"
    bg="linear-gradient(45deg, #4CAF50, #2196F3)"
  >
    <div>
      <Card.Header>Custom Transition</Card.Header>
      <Card.Body>Click different buttons to see various animation effects!</Card.Body>
    </div>
  </Card>
));

const App = () => {
  const [show, setShow] = React.useState(true);
  const [effect, setEffect] = React.useState('zoom');

  const onChange = newEffect => {
    setShow(!show);
    setEffect(newEffect);
  };

  return (
    <div>
      <Styles />
      <ButtonToolbar>
        <Button appearance="primary" onClick={() => onChange('zoom')}>
          Zoom
        </Button>
        <Button appearance="primary" onClick={() => onChange('flip')}>
          Flip
        </Button>
        <Button appearance="primary" onClick={() => onChange('rotate')}>
          Rotate
        </Button>
        <Button appearance="primary" onClick={() => onChange('bounce')}>
          Bounce
        </Button>
      </ButtonToolbar>
      <hr />
      <div>
        <Animation.Transition
          exitedClassName={`custom-exited custom-${effect}-exited`}
          exitingClassName={`custom-exiting custom-${effect}-exiting`}
          enteredClassName={`custom-entered custom-${effect}-entered`}
          enteringClassName={`custom-entering custom-${effect}-entering`}
          in={show}
        >
          {(props, ref) => <AnimatedPanel {...props} ref={ref} />}
        </Animation.Transition>
      </div>
    </div>
  );
};

function Styles() {
  return (
    <style>{`
      .custom-exiting,
      .custom-entering {
        animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        animation-fill-mode: forwards;
      }

      /* Zoom animation */
      .custom-zoom-exiting {
        animation-name: zoomOut;
      }
      .custom-zoom-entering {
        animation-name: zoomIn;
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

      /* Flip animation */
      .custom-flip-exiting {
        animation-name: flipOut;
      }
      .custom-flip-entering {
        animation-name: flipIn;
      }
      @keyframes flipIn {
        from {
          opacity: 0;
          transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        }
        40% {
          transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        }
        60% {
          opacity: 1;
          transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        }
        80% {
          transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
        }
        to {
          transform: perspective(400px);
        }
      }
      @keyframes flipOut {
        from {
          transform: perspective(400px);
        }
        30% {
          opacity: 1;
          transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        }
        to {
          opacity: 0;
          transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        }
      }

      /* Rotate animation */
      .custom-rotate-exiting {
        animation-name: rotateOut;
      }
      .custom-rotate-entering {
        animation-name: rotateIn;
      }
      @keyframes rotateIn {
        from {
          opacity: 0;
          transform: rotate3d(0, 0, 1, -180deg) scale(0.3);
        }
        50% {
          opacity: 1;
        }
      }
      @keyframes rotateOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
          transform: rotate3d(0, 0, 1, 180deg) scale(0.3);
        }
      }

      /* Bounce animation */
      .custom-bounce-exiting {
        animation-name: bounceOut;
      }
      .custom-bounce-entering {
        animation-name: bounceIn;
      }
      @keyframes bounceIn {
        from {
          opacity: 0;
          transform: scale3d(0.3, 0.3, 0.3);
        }
        20% {
          transform: scale3d(1.1, 1.1, 1.1);
        }
        40% {
          transform: scale3d(0.9, 0.9, 0.9);
        }
        60% {
          opacity: 1;
          transform: scale3d(1.03, 1.03, 1.03);
        }
        80% {
          transform: scale3d(0.97, 0.97, 0.97);
        }
        to {
          opacity: 1;
          transform: scale3d(1, 1, 1);
        }
      }
      @keyframes bounceOut {
        20% {
          transform: scale3d(0.9, 0.9, 0.9);
        }
        50%, 55% {
          opacity: 1;
          transform: scale3d(1.1, 1.1, 1.1);
        }
        to {
          opacity: 0;
          transform: scale3d(0.3, 0.3, 0.3);
        }
      }

      .custom-entered {
        opacity: 1;
      }
      .custom-exited {
        opacity: 0;
      }
    `}</style>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
