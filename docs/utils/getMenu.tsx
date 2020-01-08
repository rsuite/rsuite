import * as React from 'react';
import _ from 'lodash';
import IconGuide from '../components/icons/Guide';
import IconComponent from '../components/icons/Component';
import IconTools from '../components/icons/Tools';
import IconExtension from '../components/icons/Extension';
import components from './component.config.json';
import { getDict } from '../locales';

const dict = getDict();

const getMenu = locale => {
  return [
    {
      id: 'guide',
      name: _.get(locale, 'common.guide'),
      icon: <IconGuide />,
      children: [
        {
          id: 'introduction',
          name: _.get(locale, 'common.introduction')
        },
        {
          id: 'usage',
          name: _.get(locale, 'common.usage')
        },

        {
          id: 'use-with-create-react-app',
          name: _.get(locale, 'common.useWithCreateReactApp')
        },
        {
          id: 'use-next-app',
          name: _.get(locale, 'common.useNextApp')
        },

        {
          id: 'modularized',
          name: _.get(locale, 'common.modularized')
        },

        {
          id: 'themes',
          name: _.get(locale, 'common.customizeTheme')
        },
        {
          id: 'intl',
          name: _.get(locale, 'common.intl')
        },
        {
          id: 'rtl',
          name: _.get(locale, 'common.rtl')
        },
        {
          id: 'html-elements',
          name: _.get(locale, 'common.htmlElements')
        },
        {
          id: 'v3-to-v4',
          name: _.get(locale, 'common.v3ToV4')
        },
        {
          id: 'logs',
          name: _.get(locale, 'common.v3'),
          target: '_blank',
          url: 'https://v3.rsuitejs.com/'
        },
        {
          id: 'logs',
          name: _.get(locale, 'common.v2'),
          target: '_blank',
          url: 'https://v2.rsuitejs.com/'
        },
        {
          id: 'logs',
          name: _.get(locale, 'common.changeLog'),
          target: '_blank',
          url: 'https://github.com/rsuite/rsuite/releases'
        }
      ]
    },
    {
      id: 'components',
      name: _.get(locale, 'common.components'),
      icon: <IconComponent />,
      children: components
    },
    {
      id: 'tools',
      name: _.get(locale, 'common.tools'),
      icon: <IconTools />,
      children: [
        {
          id: 'palette',
          name: _.get(locale, 'common.palette')
        },
        {
          id: 'icons',
          name: _.get(locale, 'common.icons')
        }
      ]
    },
    {
      id: 'extensions',
      icon: <IconExtension />,
      name: _.get(locale, 'common.extension')
    }
  ];
};

export const menu = getMenu(dict);

export default getMenu;
