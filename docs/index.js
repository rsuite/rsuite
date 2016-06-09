import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory} from 'react-router';


// style
import './docs.less';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/theme/base16-dark.css';


import DocHeader from './fixtures/DocHeader';
import DocSidebar from './fixtures/DocSidebar';
import DocFooter from './fixtures/DocFooter';

import Container from '../src/Container';
import Content from '../src/Content';


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

// Pages
import PageIndex from  './pages/PageIndex';
import PageGettingStarted from  './pages/PageGettingStarted';
import PageComponents from './pages/PageComponents';
import PageComponentsDoc from './pages/PageComponentsDoc';


render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PageIndex}/>
            <Route path="getting-started" component={PageGettingStarted} />
            <Route path="components" component={PageComponents}>
                <Route path=":name"  component={PageComponentsDoc} />
                <IndexRedirect to="buttons" />
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));
