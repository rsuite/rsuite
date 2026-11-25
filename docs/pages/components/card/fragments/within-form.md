<!--start-code-->

```js
import { Card, Heading, Text, Form, Button, SelectPicker } from 'rsuite';

const App = () => {
  return (
    <Card width={400} shaded size="lg">
      <Card.Header>
        <Heading level={4}>Create project</Heading>
        <Text muted>Fill in the form below to create a new project</Text>
      </Card.Header>
      <Card.Body>
        <Form fluid id="project-form" onSubmit={formValue => console.log(formValue)}>
          <Form.Group>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name="name" placeholder="Name of project" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Platform</Form.ControlLabel>
            <Form.Control
              block
              name="platform"
              searchable={false}
              accepter={SelectPicker}
              placeholder="Select platform"
              data={[
                { label: 'Web', value: 'web' },
                { label: 'Mobile', value: 'mobile' },
                { label: 'Desktop', value: 'desktop' }
              ]}
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Button appearance="primary" type="submit" form="project-form">
          Create
        </Button>
        <Button appearance="subtle">Cancel</Button>
      </Card.Footer>
    </Card>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
