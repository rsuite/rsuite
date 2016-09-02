import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/events';
import { EventTable } from '../../components/Events';


function mapState2Props(state) {
    return {
        data: state.store.events.data,
        status: state.store.events.status
    };
}

function mapDispatch2Props(dispatch) {
    const actions = bindActionCreators(actionCreators, dispatch);
    return {
        onFetchEvents: actions.fetchEvents
    };
}

export default connect(mapState2Props, mapDispatch2Props)(EventTable);
