import * as React from 'react';
import IconGuide from '../components/icons/Guide';
import IconComponent from '../components/icons/Component';
import IconTools from '../components/icons/Tools';
import IconExtension from '../components/icons/Extension';
import components from './component.config.json';
import AppContext from '@/components/AppContext';

export default function getPages() {
  const { messages } = React.useContext(AppContext);

  return [
    {
      id: 'guide',
      name: messages?.common?.guide,
      icon: <IconGuide />,
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
          id: 'html-elements',
          name: messages?.common?.htmlElements
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
      icon: <IconComponent />,
      children: components
    },
    {
      id: 'tools',
      name: messages?.common?.tools,
      icon: <IconTools />,
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
      icon: <IconExtension />,
      name: messages?.common?.extension
    }
  ];
}
