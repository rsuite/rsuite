import fetchJsonp from '../utils/fetchJsonp';
import { FETCH_EVENTS } from '../constants/ActionTypes';
import { API_EVENTS } from '../constants/APIs';

function fetchEventsRequest() {
    return {
        status: 'request',
        type: FETCH_EVENTS
    };
}

function fetchEventsSuccess(json) {
    return {
        type: FETCH_EVENTS,
        status: 'success',
        items: json.data
    };
}

function fetchEventsFailure() {
    return {
        type: FETCH_EVENTS,
        status: 'error',
        error: 'Oops'
    };
}

/**
 * 获取菜单信息
 */
export function fetchEvents() {
    return (dispatch) => {
        dispatch(fetchEventsRequest());
        return fetchJsonp(API_EVENTS,{
            type:'jsonp',
            jsonpCallback: 'callback',
        })
            .then((response) => response.json())
            .then((json) => {
                dispatch(fetchEventsSuccess(json));
            })
            .catch(function (error) {
                dispatch(fetchEventsFailure());
            });
    };
}
