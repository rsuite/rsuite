import React from 'react';
import {  Link } from 'react-router';
import Frame from '../../components/Frame';
import RepoList from './RepoList';

const LabelGroups = React.createClass({

    render: function () {

        const children = this.props.children || (
            <RepoList/>
        );
        return (
            <Frame>
                {children}
            </Frame>

        );
    }
});

export default LabelGroups;
