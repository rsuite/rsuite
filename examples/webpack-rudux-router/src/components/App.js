import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';

import locales from '../locales';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

addLocaleData([...zh, ...en]);


const App = React.createClass({
    propTypes: {
        menuItems: React.PropTypes.array,
        locale: React.PropTypes.string
    },
    childContextTypes: {
        menuItems: React.PropTypes.array,
    },
    getChildContext() {

        return {
            menuItems: this.props.menuItems
        };
    },
    render() {
        const { locale, children} = this.props;
        return (
            <IntlProvider
                locale={locale}
                messages={locales[locale]}
                >

                <div className="page">
                    {children}
                </div>
            </IntlProvider>
        );
    }
});

export default App;
