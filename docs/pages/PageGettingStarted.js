
import React from 'react';
import { Link } from 'react-router';
import { Container, Content, Row, Col } from '../../src';
import { Markdown } from '../fixtures/Markdown';

const PageGettingStarted = React.createClass({
    render: function () {
        return (
            <Content>
                <Row>
                    <Col md={12}>
                        <Markdown>
                            {require('./getting-started.md') }
                        </Markdown>
                    </Col>
                </Row>
            </Content>
        );
    }
});

export default PageGettingStarted;
