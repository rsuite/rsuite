import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';


function mapState2Props(state) {
    return {
        ...state.store.settings
    };
}



export default connect(mapState2Props)(App);
