import React from 'react';
import { Nav } from 'rsuite';
import StaticCodeView from '../CodeView/StaticCodeView';

const unstyledComponents = [
  'Schema',
  'DOMHelper',
  'Whisper',
  'SafeAnchor',
  'Affix',
  'internals',
  'CustomProvider',
  'locales',
  'MaskedInput'
];

const defaultCommands = {
  main: '',
  individual: ''
};

interface ImportGuideProps {
  name?: string;
  activeCommand?: keyof typeof defaultCommands;
  components?: string[];
  hasCssComponents?: string[];
}

function individualCode(components: string[], hasCssComponents: string[], name = 'rsuite') {
  let individual = components
    .map(component => `import ${component} from '${name}/${component}';`)
    .join('\r\n');

  if (hasCssComponents.length > 0) {
    individual +=
      '\r\n\r\n// (Optional) Import component styles. If you are using Less, import the `index.less` file. \r\n' +
      hasCssComponents
        .map(component => `import '${name}/${component}/styles/index.css';`)
        .join('\r\n');
  }

  return individual;
}

function mainCode(components: string[], name = 'rsuite') {
  return `import { ${components.join(', ')} } from '${name}';`;
}

const ImportGuide = (props: ImportGuideProps) => {
  const {
    name = 'rsuite',
    activeCommand,
    components,
    hasCssComponents: hasCssComponentsProp
  } = props;
  const [active, setActive] = React.useState(activeCommand || 'main');

  const hasCssComponents =
    hasCssComponentsProp || components.filter(component => !unstyledComponents.includes(component));

  const main = mainCode(components, name);
  const individual = individualCode(components, hasCssComponents, name);
  const commands = { main, individual };

  return (
    <div style={{ marginTop: 16 }}>
      <Nav appearance="subtle" activeKey={active} onSelect={setActive}>
        <Nav.Item eventKey="main">Main</Nav.Item>
        <Nav.Item eventKey="individual">Individual</Nav.Item>
      </Nav>

      <StaticCodeView code={commands[active]} language="javascript" />
    </div>
  );
};

export default ImportGuide;
