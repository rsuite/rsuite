import React from 'react';
import {Content, Row, Col, Whisper, Tooltip} from '../../src';

const data = [
    {
        thumb: "http://placehold.it/370x220/373c44?text=EXAMPLE",
        url: "http://rsuite.github.io/examples/webpack-rudux-router",
        intro: "webpack + react + react-router + redux",
        name: "RSuite Example",
        src: "https://github.com/rsuite/rsuite/tree/master/examples/webpack-rudux-router"
    }
];

const tooltip = (
    <Tooltip>源码</Tooltip>
);

const IntroBlock = React.createClass({
    propTypes: {
        thumb: React.PropTypes.string,
        url: React.PropTypes.string,
        intro: React.PropTypes.string,
        name: React.PropTypes.string,
        src: React.PropTypes.string
    },
    render() {
        const {
            thumb = "http://placehold.it/370x220/?text=rsuite",
            url = 'javascript:;',
            intro = '--',
            name = '--',
            src = 'javascript:;'
        }=this.props;

        return (
            <Col lg={3} md={4} sm={6} xs={12}>
                <div className="intro-block">
                    <p className="thumb">
                        <a href={url} target="_blank">
                            <img src={thumb}/>
                        </a>
                    </p>
                    <div className="intro-content">
                        <h4 className="info">
                            <a href={url} className="title" target="_blank">{name}</a>
                            <Whisper placement="top" speaker={tooltip}>
                                <a className="code fa fa-code" href={src} target="_blank"></a>
                            </Whisper>
                        </h4>
                        <p className="intro" title={intro}>{intro}</p>
                    </div>
                </div>
            </Col>
        );
    }
});


const PageExamples = React.createClass({
    render() {
        let introBlocks = data.map((info, key)=> {
            return <IntroBlock
                key={key}
                thumb={info.thumb}
                url={info.url}
                intro={info.intro}
                name={info.name}
                src={info.src}
            />
        });

        return (
            <Content id="examples-content">
                <Row>
                    {introBlocks}
                </Row>
            </Content>
        );
    }
});

export default PageExamples;
