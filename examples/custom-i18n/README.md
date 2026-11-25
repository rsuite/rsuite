# React Suite Internationalization Example

This example demonstrates how to use [react-intl](https://formatjs.io/docs/react-intl/) with React Suite to create a fully internationalized application.

## Features

- **Dual Language Support**: Switch between English and Chinese (Simplified)
- **React Suite Localization**: Demonstrates rsuite's built-in i18n capabilities
- **Custom Application i18n**: Shows how to manage your own translations with react-intl
- **Comprehensive Examples**:
  - Date formatting with `FormattedDate`
  - Number/Currency formatting with `FormattedNumber`
  - Message translations with `FormattedMessage`
  - Multiple rsuite components (SelectPicker, DatePicker, Calendar)
  - Notification system integration

## Tech Stack

- **React 18** - Modern React with Hooks
- **React Suite 6** - UI component library
- **react-intl 6** - Internationalization framework
- **Webpack 5** - Module bundler

## Project Structure

```
custom-i18n/
├── src/
│   ├── components/
│   │   └── App.js              # Main application component
│   ├── locales/
│   │   ├── en-US.js            # English translations
│   │   ├── zh-CN.js            # Chinese translations
│   │   └── index.js            # Locale exports
│   ├── index.html              # HTML template
│   └── index.js                # Application entry point
├── .babelrc.js                 # Babel configuration
├── webpack.config.js           # Webpack configuration
└── package.json                # Dependencies
```

## Getting Started

### Installation

```bash
npm install
# or
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3100`

### Production Build

Build for production:

```bash
npm run build
# or
pnpm build
```

## How It Works

### 1. Setting up rsuite Localization

React Suite components have built-in localization support. Wrap your app with `CustomProvider`:

```jsx
import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/locales/zh_CN';
import enUS from 'rsuite/locales/en_US';

<CustomProvider locale={enUS}>
  <App />
</CustomProvider>
```

### 2. Setting up Application i18n

Use `react-intl` for your custom translations:

```jsx
import { IntlProvider } from 'react-intl';
import messages from './locales/en-US';

<IntlProvider locale="en" messages={messages}>
  <App />
</IntlProvider>
```

### 3. Using Translations

Use `FormattedMessage` for text translations:

```jsx
import { FormattedMessage } from 'react-intl';

<FormattedMessage id="hello" />
```

Use `FormattedDate` for date formatting:

```jsx
import { FormattedDate } from 'react-intl';

<FormattedDate
  value={date}
  year="numeric"
  month="long"
  day="2-digit"
  weekday="long"
/>
```

Use `FormattedNumber` for number/currency formatting:

```jsx
import { FormattedNumber } from 'react-intl';

<FormattedNumber value={123456.789} style="currency" currency="USD" />
```

### 4. Adding New Languages

To add a new language:

1. Create a new locale file in `src/locales/` (e.g., `fr-FR.js`)
2. Add translations for all message IDs
3. Import and add to the locales object in `src/locales/index.js`
4. Import the corresponding rsuite locale
5. Add a radio button for the new language

## Key Concepts

### Combining Two i18n Systems

This example shows how to combine:

- **rsuite's built-in i18n**: For component UI text (buttons, placeholders, etc.)
- **react-intl**: For your application-specific content

Both systems work together seamlessly when properly configured.

### State Management

The example uses React's `useState` hook to manage the current locale, demonstrating:

- Dynamic language switching
- Synchronized updates across both i18n systems
- Reactive UI updates

## Available Languages

- **English** (`en-US`)
- **Simplified Chinese** (`zh-CN`)

## Learn More

- [React Suite Documentation](https://rsuitejs.com)
- [React Suite Internationalization Guide](https://rsuitejs.com/guide/intl/)
- [react-intl Documentation](https://formatjs.io/docs/react-intl/)
- [Format.JS](https://formatjs.io/) - Internationalization library ecosystem

## License

MIT
