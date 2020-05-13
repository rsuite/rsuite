import * as React from 'react';
import { Icon } from 'rsuite';
import components from './component.config.json';
import AppContext from '@/components/AppContext';
import * as SvgIcons from '@/components/SvgIcons';

export default function getPages() {
  const { messages } = React.useContext(AppContext);

  return [
    {
      id: 'guide',
      name: messages?.common?.guide,
      icon: <Icon icon={SvgIcons.Guide} size="lg" />,
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
          id: 'themes',
          name: messages?.common?.customizeTheme
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
      icon: <Icon icon={SvgIcons.Component} size="lg" />,
      children: components
    },
    {
      id: 'tools',
      name: messages?.common?.tools,
      icon: <Icon icon={SvgIcons.Tools} size="lg" />,
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
      icon: <Icon icon={SvgIcons.Extension} size="lg" />,
      name: messages?.common?.extension
    }
  ];
}
