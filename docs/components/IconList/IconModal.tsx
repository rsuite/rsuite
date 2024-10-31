import {
  Modal,
  Heading,
  Stack,
  ButtonGroup,
  Button,
  IconButton,
  InputGroup,
  Input,
  HStack,
  ModalProps,
  VStack
} from 'rsuite';
import * as Icons from '@rsuite/icons';

export interface IconMeta {
  iconName: string;
  categoryName: string;
  version?: string;
}
interface IcomModalProps extends ModalProps {
  activeIcon: IconMeta;
}

function IcomModal(props: IcomModalProps) {
  const { open, activeIcon, onClose } = props;
  const { iconName, version } = activeIcon || {};
  const Icon = iconName ? Icons[iconName] : null;

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title as={HStack}>
          {iconName}
          {version && (
            <img
              src={`https://img.shields.io/badge/@rsuite\/icons->=${version}-blue`}
              alt={`Supported from version ${version}`}
              title={`Supported from version ${version}`}
            />
          )}
        </Modal.Title>
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
        {Icon ? (
          <>
            <HStack justifyContent="space-between">
              <div className="icon-bg-transparent icon-box">
                <Icon style={{ fontSize: 200 }} />
              </div>
              <VStack spacing={20}>
                <div className="icon-example-list">
                  <Icon style={{ fontSize: '2em' }} />
                  <Icon style={{ fontSize: '3em' }} />
                  <Icon style={{ fontSize: '4em' }} />
                  <Icon style={{ fontSize: '5em' }} />
                </div>
                <div className="icon-example-list">
                  <Icon className="icon-item-box" style={{ color: '#1675e0' }} />
                  <Icon
                    className="icon-item-box"
                    style={{ background: '#1675e0', color: '#fff' }}
                  />
                  <Icon className="icon-item-box" style={{ color: '#000' }} />
                  <Icon className="icon-item-box" style={{ background: '#000', color: '#fff' }} />
                </div>
              </VStack>
            </HStack>
            <Heading level={5} style={{ margin: '20px 0' }}>
              Examples
            </Heading>
            <Stack spacing={10} wrap>
              <Button startIcon={<Icon />} appearance="primary">
                Button
              </Button>
              <Button startIcon={<Icon />}>Button</Button>
              <InputGroup inside>
                <InputGroup.Addon>
                  <Icon />
                </InputGroup.Addon>
                <Input placeholder="Input group" />
              </InputGroup>
              <IconButton icon={<Icon />} appearance="primary" />
              <IconButton icon={<Icon />} />
              <ButtonGroup>
                <IconButton icon={<Icon />} />
                <IconButton icon={<Icon />} />
                <IconButton icon={<Icon />} />
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
