import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, IconButton, Whisper, Popover, Dropdown } from 'rsuite';
import DefaultPage from '@/components/Page';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import ImportGuide from '@/components/ImportGuide';
import { FaFacebook, FaGooglePlus, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiWechat, SiSinaweibo } from 'react-icons/si';
const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Button', 'ButtonGroup', 'ButtonToolbar']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Whisper,
        Popover,
        Dropdown,
        Button,
        ButtonGroup,
        IconButton,
        ButtonToolbar,
        ArrowDownIcon,
        FaFacebook,
        FaGooglePlus,
        FaTwitter,
        FaGithub,
        FaLinkedin,
        SiWechat,
        SiSinaweibo
      }}
      sandboxDependencies={{ 'react-icons': 'latest' }}
    />
  );
}
