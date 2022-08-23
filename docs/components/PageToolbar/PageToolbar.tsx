import React, { useEffect } from 'react';
import { ButtonToolbar, Tooltip, Whisper, Dropdown, IconButton } from 'rsuite';
import canUseDOM from 'dom-lib/canUseDOM';
import AppContext from '../AppContext';
import LanguageButton from '../LanguageButton';
import packageJson from '../../package.json';
import { MoreActions } from './MoreActions';
import HeartIcon from '@rsuite/icons/legacy/HeartO';

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
      url: 'https://v4.rsuitejs.com/'
    },
    {
      id: 'v3',
      name: messages?.common?.v3,
      url: 'https://v3.rsuitejs.com/'
    }
  ];

  useEffect(() => {
    setShow(canUseDOM);
  }, []);

  return show ? (
    <ButtonToolbar className="page-toolbar">
      <IconButton
        size="sm"
        icon={<HeartIcon color="red" />}
        href="https://opencollective.com/rsuite"
        target="_blank"
      />
      <Dropdown title={packageJson.version} size="sm">
        {versions.map(version => (
          <Dropdown.Item key={version.id} as="a" href={version.url}>
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
