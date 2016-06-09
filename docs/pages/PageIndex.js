
import React from 'react';
import { Link } from 'react-router';
import { Container, Content, Row, Col } from '../../src';
import dom from '../../src/utils/dom';
import { addStyle } from '../../src/utils/style';
import { Markdown } from '../fixtures/Markdown';
import eventListener from '../../src/utils/eventListener';
import Banner from '../fixtures/Banner';


const PageIndex = React.createClass({
    handleWindowResize() {
        let banner = document.getElementById('banner');
        let height = parseInt(dom.getHeight(banner)) - 50;
        let indexContent = document.getElementById('index-content');
        addStyle(indexContent, 'margin-top', (height < 0 ? 0 : height) + 'px');
    },
    componentDidMount() {
        this._onWindowResizeListener = eventListener.on(window, 'resize', this.handleWindowResize);
        this.handleWindowResize();
    },
    componentWillUnmount() {
        if (this._onWindowResizeListener) {
            this._onWindowResizeListener.off();
        }
    },
    render() {

        return (
            <div>
                <Banner id="banner">
                    <h1 className="logo">Suite</h1>
                    <p>一个基于 React.js 的 Web 组件库</p>
                    <div className="nav">
                        <Link to="/getting-started" className="primary">开始使用</Link>
                        <Link to="/components/buttons">组件</Link>
                        <a href="https://github.com/suitejs/suite">GitHub</a>
                    </div>
                </Banner>
                <Content>
                    <Row>
                        <Col id="index-content" md={12}>
                            <Markdown>
                                {require('./readme.md') }
                            </Markdown>
                        </Col>
                    </Row>
                </Content>
            </div>
        );
    }
});

export default PageIndex;
