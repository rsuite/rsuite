<!--start-code-->

```js
import PageIcon from '@rsuite/icons/Page';
import ImageIcon from '@rsuite/icons/Image';
import FolderIcon from '@rsuite/icons/Folder';
import StarIcon from '@rsuite/icons/Star';
import TrashIcon from '@rsuite/icons/Trash';
import { Sidenav, Nav, Modal, Button } from 'rsuite';

const Sidebar = () => (
  <Sidenav style={{ width: 200 }} defaultOpenKeys={['1', '2']}>
    <Sidenav.Body>
      <Nav>
        <Nav.Item panel>
          <Sidenav.GroupLabel>File Browser</Sidenav.GroupLabel>
        </Nav.Item>
        <Nav.Menu eventKey="1" title="Documents" icon={<PageIcon />}>
          <Nav.Item eventKey="1-1">Recent Files</Nav.Item>
          <Nav.Item eventKey="1-2">My Documents</Nav.Item>
          <Nav.Item eventKey="1-3">Shared with Me</Nav.Item>
        </Nav.Menu>
        <Nav.Menu eventKey="2" title="Images" icon={<ImageIcon />}>
          <Nav.Item eventKey="2-1">Photo Albums</Nav.Item>
          <Nav.Item eventKey="2-2">Screenshots</Nav.Item>
        </Nav.Menu>
        <Nav.Item eventKey="3" icon={<FolderIcon />}>
          All Folders
        </Nav.Item>
        <Nav.Item eventKey="4" icon={<StarIcon />}>
          Favorites
        </Nav.Item>
        <Nav.Item eventKey="5" icon={<TrashIcon />}>
          Trash
        </Nav.Item>
      </Nav>
    </Sidenav.Body>
  </Sidenav>
);

const App = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open File Browser</Button>
      <Modal
        overflow
        open={open}
        size="lg"
        onClose={() => setOpen(false)}
        dialogStyle={{ padding: 0 }}
      >
        <HStack alignItems="stretch">
          <Sidebar />
          <Modal.Body style={{ flex: 1, padding: 20 }}>
            <Placeholder.Grid rows={16} columns={4} />
          </Modal.Body>
        </HStack>
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
