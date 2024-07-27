import {
  Modal,
  FlexboxGrid,
  Heading,
  Stack,
  ButtonGroup,
  Button,
  IconButton,
  InputGroup,
  Input,
  ModalProps
} from 'rsuite';
import * as Icons from '@rsuite/icons';

interface IcomModalProps extends ModalProps {
  iconName: string;
}

function IcomModal(props: IcomModalProps) {
  const { open, iconName, onClose } = props;
  const IconComponent = iconName ? Icons[iconName] : null;

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{iconName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="doc-highlight rcv-highlight" style={{ margin: '0 0 1em 0' }}>
          <pre>
            <code className="javascript">
              <span className="hljs-keyword">import</span>
              {` ${iconName}Icon `}
              <span className="hljs-keyword">from</span>{' '}
              <span className="hljs-string">{`'@rsuite/icons/${iconName}'`}</span>;
            </code>
          </pre>
        </div>
        {IconComponent ? (
          <>
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={12}>
                <div className="icon-bg-transparent" style={{ padding: 10, textAlign: 'center' }}>
                  <IconComponent style={{ fontSize: 200 }} />
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={12}>
                <div className="icon-example-list">
                  <IconComponent style={{ fontSize: '2em' }} />
                  <IconComponent style={{ fontSize: '3em' }} />
                  <IconComponent style={{ fontSize: '4em' }} />
                  <IconComponent style={{ fontSize: '5em' }} />
                </div>
                <div className="icon-example-list" style={{ marginTop: 20 }}>
                  <IconComponent className="icon-item-box" style={{ color: '#1675e0' }} />
                  <IconComponent
                    className="icon-item-box"
                    style={{ background: '#1675e0', color: '#fff' }}
                  />
                  <IconComponent className="icon-item-box" style={{ color: '#000' }} />
                  <IconComponent
                    className="icon-item-box"
                    style={{ background: '#000', color: '#fff' }}
                  />
                </div>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <Heading level={5} style={{ margin: '20px 0' }}>
              Examples
            </Heading>
            <Stack spacing={10} wrap>
              <Button startIcon={<IconComponent />} appearance="primary">
                Button
              </Button>
              <Button startIcon={<IconComponent />}>Button</Button>
              <InputGroup inside>
                <InputGroup.Addon>
                  <IconComponent />
                </InputGroup.Addon>
                <Input placeholder="Input group" />
              </InputGroup>
              <IconButton icon={<IconComponent />} appearance="primary" />
              <IconButton icon={<IconComponent />} />
              <ButtonGroup>
                <IconButton icon={<IconComponent />} />
                <IconButton icon={<IconComponent />} />
                <IconButton icon={<IconComponent />} />
              </ButtonGroup>
            </Stack>
          </>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default IcomModal;
