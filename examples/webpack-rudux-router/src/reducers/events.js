import { FETCH_EVENTS } from '../constants/ActionTypes';


const initialState = {
    data: []
};

export default function events(state = initialState, action) {
    switch (action.type) {
        case FETCH_EVENTS:
            return Object.assign({}, state, {
                status: action.status,
                data: action.items
            });
        default:
            return state;
    }
};
