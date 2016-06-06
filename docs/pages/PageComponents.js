
import React from 'react';
import { Link } from 'react-router';
import { Container, Content, Row, Col } from '../../src';

import DocHeader from '../fixtures/DocHeader';
import DocSidebar from '../fixtures/DocSidebar';



const PageComponents = React.createClass({
    render: function () {
        return (
            <Row>
                 <Col md={3} sm={12}>
                     <DocSidebar />
                 </Col>
                 {this.props.children}
            </Row>

        );
    }
});

export default PageComponents;
