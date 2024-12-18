import React from 'react';
import Icon from '@rsuite/icons/Icon';
import components from './component.config.json';
import { useApp } from '@/components/AppContext';
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
  const { locales } = useApp();
  return [
    {
      id: 'guide',
      name: locales?.common?.guide,
      icon: <Icon as={() => <SvgIcons.Guide />} style={{ fontSize: 20 }} />,
      children: [
        {
          group: true,
          id: 'getting-started',
          name: locales?.common?.gettingStarted,
          children: [
            {
              id: 'introduction',
              name: locales?.common?.introduction
            },
            {
              id: 'usage',
              name: locales?.common?.usage
            },
            {
              id: 'composition',
              name: locales?.common?.composition
            },
            {
              id: 'accessibility',
              name: locales?.common?.accessibility
            },
            {
              id: 'v5-features',
              name: locales?.common?.v5Features
            },
            {
              id: 'logs',
              name: locales?.common?.changeLog,
              target: '_blank',
              url: 'https://github.com/rsuite/rsuite/releases'
            }
          ]
        },

        {
          group: true,
          id: 'frameworks',
          name: locales?.common?.frameworks,
          children: [
            {
              id: 'use-vite',
              name: locales?.common?.useVite
            },
            {
              id: 'use-next-app',
              name: locales?.common?.useNextApp
            },
            {
              id: 'use-next-pages',
              name: locales?.common?.useNextPages
            },
            {
              id: 'use-with-create-react-app',
              name: locales?.common?.useWithCreateReactApp
            }
          ]
        },

        {
          group: true,
          id: 'customization',
          name: locales?.common?.customization,
          children: [
            {
              id: 'official-themes',
              name: locales?.common?.officialThemes
            },

            {
              id: 'customization-less',
              name: locales?.common?.customizationLess
            },
            {
              id: 'css-variables',
              name: locales?.common?.cssVariables
            },
            {
              id: 'css-reset',
              name: locales?.common?.cssReset
            },
            {
              id: 'i18n',
              name: locales?.common?.i18n
            },
            {
              id: 'rtl',
              name: locales?.common?.rtl
            }
          ]
        },

        {
          group: true,
          id: 'performance',
          name: locales?.common?.performance,
          children: [
            {
              id: 'optimizing-performance',
              name: locales?.common?.optimizingPerformance
            },
            {
              id: 'modularized',
              name: locales?.common?.modularized
            }
          ]
        }
      ]
    },
    {
      id: 'components',
      name: locales?.common?.components,
      icon: <Icon as={() => <SvgIcons.Component />} style={{ fontSize: 20 }} />,
      children: components
    },
    {
      id: 'resources',
      name: locales?.common?.resources,
      icon: <Icon as={() => <SvgIcons.Ecology />} style={{ fontSize: 20 }} />,
      children: [
        {
          id: 'templates',
          name: locales?.common?.templates
        },
        {
          id: 'icons',
          name: locales?.common?.icons
        },
        {
          id: 'design',
          name: locales?.common?.designResources
        },
        {
          id: 'colors',
          name: locales?.common?.colors
        },
        {
          id: 'palette',
          name: locales?.common?.palette
        },
        {
          id: 'extensions',
          name: locales?.common?.extension
        },
        {
          id: 'examples',
          name: locales?.common?.examples
        }
      ]
    }
  ];
}
