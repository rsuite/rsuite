import React from 'react';

import DocHeader from '../fixtures/DocHeader';
import DocSidebar from '../fixtures/DocSidebar';
import DocFooter from '../fixtures/DocFooter';

import Container from '../../src/Container';

const App = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function () {
        return (
            <div className="doc-page">
                <DocHeader />
                <Container className="doc-container">
                    {this.props.children}
                </Container>
                <DocFooter />
            </div>
        );
    }
});

export default App;
