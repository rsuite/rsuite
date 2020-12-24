import React from 'react';
import { Icon } from '@rsuite/icons';
import components from './component.config.json';
import AppContext from '@/components/AppContext';
import * as SvgIcons from '@/components/SvgIcons';

export default function usePages() {
  const { messages } = React.useContext(AppContext);
  return [
    {
      id: 'guide',
      name: messages?.common?.guide,
      icon: <Icon as={() => <SvgIcons.Guide />} style={{ fontSize: 20 }} />,
      children: [
        {
          id: 'introduction',
          name: messages?.common?.introduction
        },
        {
          id: 'usage',
          name: messages?.common?.usage
        },

        {
          id: 'composition',
          name: messages?.common?.composition
        },
        {
          id: 'themes',
          name: messages?.common?.customizeTheme
        },
        {
          id: 'accessibility',
          name: messages?.common?.accessibility
        },
        {
          id: 'intl',
          name: messages?.common?.intl
        },
        {
          id: 'rtl',
          name: messages?.common?.rtl
        },
        {
          id: 'use-with-create-react-app',
          name: messages?.common?.useWithCreateReactApp
        },
        {
          id: 'use-next-app',
          name: messages?.common?.useNextApp
        },
        {
          id: 'modularized',
          name: messages?.common?.modularized
        },
        {
          id: 'v4-to-v5',
          name: messages?.common?.v4ToV5
        },
        {
          id: 'v3-to-v4',
          name: messages?.common?.v3ToV4
        },
        {
          id: 'logs',
          name: messages?.common?.v3,
          target: '_blank',
          url: 'https://v3.rsuitejs.com/'
        },
        {
          id: 'logs',
          name: messages?.common?.v2,
          target: '_blank',
          url: 'https://v2.rsuitejs.com/'
        },
        {
          id: 'logs',
          name: messages?.common?.changeLog,
          target: '_blank',
          url: 'https://github.com/rsuite/rsuite/releases'
        }
      ]
    },
    {
      id: 'components',
      name: messages?.common?.components,
      icon: <Icon as={() => <SvgIcons.Component />} style={{ fontSize: 20 }} />,
      children: components
    },
    {
      id: 'tools',
      name: messages?.common?.tools,
      icon: <Icon as={() => <SvgIcons.Tools />} style={{ fontSize: 20 }} />,
      children: [
        {
          id: 'palette',
          name: messages?.common?.palette
        },
        {
          id: 'icons',
          name: messages?.common?.icons
        }
      ]
    },
    {
      id: 'extensions',
      icon: <Icon as={() => <SvgIcons.Extension />} style={{ fontSize: 20 }} />,
      name: messages?.common?.extension
    }
  ];
}
