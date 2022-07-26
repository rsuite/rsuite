<!--start-code-->

```js
const renderSpeaker = ({ onClose, left, top, className, ...rest }, ref) => {
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Menu title="New File">
          <Dropdown.Item eventKey={1}>New File</Dropdown.Item>
          <Dropdown.Item eventKey={2}>New File with Current Profile</Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
        <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
        <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
        <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
        <Dropdown.Item eventKey={7}>About</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const App = () => {
  return (
    <Whisper placement="bottomStart" trigger="click" speaker={renderSpeaker}>
      <Button>File</Button>
    </Whisper>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
