import React from 'react';
import { Text } from '../../src/index';



const TextExample = React.createClass({
    render() {
        return (

            <div className="col-md-12">
                <h1 className="page-header">Text</h1>
                <Text shape="muted">text-muted</Text>
                <Text shape="primary">text-primary</Text>
                <Text shape="success">text-success</Text>
                <Text shape="info">text-info</Text>
                <Text shape="warning">text-warning</Text>
                <Text shape="danger">text-danger</Text>

                <Text shape="muted" bg>text-muted</Text>
                <Text shape="primary" bg>text-primary</Text>
                <Text shape="success" bg>text-success</Text>
                <Text shape="info" bg>text-info</Text>
                <Text shape="warning" bg>text-warning</Text>
                <Text shape="danger" bg>text-danger</Text>

            </div>
        );
    }
});

export default  TextExample;
