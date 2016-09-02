import { FETCH_REPOS } from '../constants/ActionTypes';


const initialState = {
    data: []
};

export default function repos(state = initialState, action) {
    switch (action.type) {
        case FETCH_REPOS:
            return Object.assign({}, state, {
                status: action.status,
                data: action.items
            });
        default:
            return state;
    }
};
