import React from 'react';
import { Icon } from '@rsuite/icons';
import components from './component.config.json';
import AppContext from '@/components/AppContext';
import * as SvgIcons from '@/components/SvgIcons';

export interface MenuItem {
  id?: string;
  name?: string;
  icon?: any;
  title?: string;
  components?: string[];
  target?: string;
  group?: boolean;
  url?: string;
  apis?: string[];
  children?: MenuItem[];
  tag?: string;
  tagColor?: string;
  minVersion?: string;
  keywords?: string[];
  designHash?: string;
}

export default function usePages(): MenuItem[] {
  const { messages } = React.useContext(AppContext);
  return [
    {
      id: 'guide',
      name: messages?.common?.guide,
      icon: <Icon as={() => <SvgIcons.Guide />} style={{ fontSize: 20 }} />,
      children: [
        {
          group: true,
          id: 'getting-started',
          name: messages?.common?.gettingStarted
        },
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
          id: 'accessibility',
          name: messages?.common?.accessibility
        },
        {
          id: 'v5-features',
          name: messages?.common?.v5Features
        },
        {
          id: 'logs',
          name: messages?.common?.changeLog,
          target: '_blank',
          url: 'https://github.com/rsuite/rsuite/releases'
        },
        {
          group: true,
          id: 'frameworks',
          name: messages?.common?.frameworks
        },
        {
          id: 'use-vite',
          name: messages?.common?.useVite
        },
        {
          id: 'use-next-app',
          name: messages?.common?.useNextApp
        },
        {
          id: 'use-next-pages',
          name: messages?.common?.useNextPages
        },

        {
          id: 'use-with-create-react-app',
          name: messages?.common?.useWithCreateReactApp
        },
        {
          group: true,
          id: 'customization',
          name: messages?.common?.customization
        },
        {
          id: 'official-themes',
          name: messages?.common?.officialThemes
        },

        {
          id: 'customization-less',
          name: messages?.common?.customizationLess
        },
        {
          id: 'css-variables',
          name: messages?.common?.cssVariables
        },
        {
          id: 'css-reset',
          name: messages?.common?.cssReset
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
          group: true,
          id: 'performance',
          name: messages?.common?.performance
        },
        {
          id: 'optimizing-performance',
          name: messages?.common?.optimizingPerformance
        },
        {
          id: 'modularized',
          name: messages?.common?.modularized
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
