import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import './preview.less';

const brand = {
  brandTitle: 'React Suite',
  brandUrl: 'https://rsuitejs.com',
  brandImage: '/rsuite-brand.png',
  brandTarget: '_self'
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    darkMode: {
      current: 'light',
      stylePreview: true,
      darkClass: 'rs-theme-dark',
      lightClass: 'rs-theme-light',
      classTarget: 'body',
      dark: {
        ...themes.dark,
        ...brand,
        appBg: '#000',
        barBg: 'black',
        background: 'black'
      },
      light: {
        ...themes.normal,
        ...brand,
        appBg: '#fff'
      }
    }
  }
};

export default preview;
