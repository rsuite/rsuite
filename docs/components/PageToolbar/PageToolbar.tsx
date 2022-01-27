import React, { useEffect } from 'react';
import { ButtonToolbar, Tooltip, Whisper, Dropdown } from 'rsuite';
import canUseDOM from 'dom-lib/canUseDOM';
import AppContext from '../AppContext';
import LanguageButton from '../LanguageButton';
import packageJson from '../../package.json';
import { MoreActions } from './MoreActions';

interface PageToolbarProps {
  designHash?: any;
  routerId?: string;
}

function PageToolbar({ designHash, routerId }: PageToolbarProps) {
  const { messages } = React.useContext(AppContext);

  const [show, setShow] = React.useState(false);

  const versions = [
    {
      id: 'v4',
      name: messages?.common?.v4,
      target: '_blank',
      url: 'https://v4.rsuitejs.com/'
    },
    {
      id: 'v3',
      name: messages?.common?.v3,
      target: '_blank',
      url: 'https://v3.rsuitejs.com/'
    },
    {
      id: 'v2',
      name: messages?.common?.v2,
      target: '_blank',
      url: 'https://v2.rsuitejs.com/'
    }
  ];

  useEffect(() => {
    setShow(canUseDOM);
  }, []);

  return show ? (
    <ButtonToolbar className="page-toolbar">
      <Dropdown title={packageJson.version} size="sm">
        {versions.map(version => (
          <Dropdown.Item key={version.id} as="a" href={version.url} target={version.target}>
            {version.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
      <Whisper placement="bottom" speaker={<Tooltip>{messages?.common?.changeLanguage}</Tooltip>}>
        <LanguageButton />
      </Whisper>

      <MoreActions designHash={designHash} routerId={routerId} />
    </ButtonToolbar>
  ) : null;
}

export default PageToolbar;
