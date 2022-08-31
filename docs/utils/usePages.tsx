import React from 'react';
import { Icon } from '@rsuite/icons';
import components from './component.config.json';
import AppContext from '@/components/AppContext';
import * as SvgIcons from '@/components/SvgIcons';

interface Menu {
  id?: string;
  name?: string;
  icon?: any;
  title?: string;
  components?: string[];
  target?: string;
  group?: boolean;
  url?: string;
  apis?: string[];
  children?: Menu[];
  new?: boolean;
}

export default function usePages(): Menu[] {
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
          id: 'v5-features',
          name: messages?.common?.v5Features,
          new: true
        },
        {
          id: 'composition',
          name: messages?.common?.composition
        },

        {
          id: 'official-themes',
          name: messages?.common?.officialThemes
        },
        {
          id: 'customization',
          name: messages?.common?.customization
        },

        {
          id: 'accessibility',
          name: messages?.common?.accessibility
        },
        {
          id: 'i18n',
          name: messages?.common?.i18n
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
          id: 'performance',
          name: messages?.common?.performance
        },
        {
          id: 'modularized',
          name: messages?.common?.modularized
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
      id: 'resources',
      name: messages?.common?.resources,
      icon: <Icon as={() => <SvgIcons.Ecology />} style={{ fontSize: 20 }} />,
      children: [
        {
          id: 'templates',
          name: messages?.common?.templates
        },
        {
          id: 'icons',
          name: messages?.common?.icons
        },
        {
          id: 'design',
          name: messages?.common?.designResources
        },
        {
          id: 'palette',
          name: messages?.common?.palette
        },
        {
          id: 'extensions',
          name: messages?.common?.extension
        },
        {
          id: 'examples',
          name: messages?.common?.examples
        }
      ]
    }
  ];
}
