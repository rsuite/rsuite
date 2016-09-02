
import React from 'react';
import { Link } from 'react-router';
import { Container, Content, Row, Col } from '../../src';
import { Markdown } from '../fixtures/Markdown';

const PageExamples = React.createClass({
    render: function () {
        return (
            <Content>
                <Row>
                    <Col md={12}>
                        <Markdown>
                            {require('./examples.md') }
                        </Markdown>
                    </Col>
                </Row>
            </Content>
        );
    }
});

export default PageExamples;
