import fetchJsonp from '../utils/fetchJsonp';
import { FETCH_REPOS } from '../constants/ActionTypes';
import { API_REPOS } from '../constants/APIs';

function fetchReposRequest() {
    return {
        status: 'request',
        type: FETCH_REPOS
    };
}

function fetchReposSuccess(json) {
    return {
        type: FETCH_REPOS,
        status: 'success',
        items: json.data
    };
}

function fetchReposFailure() {
    return {
        type: FETCH_REPOS,
        status: 'error',
        error: 'Oops'
    };
}

/**
 * 获取菜单信息
 */
export function fetchRepos() {
    return (dispatch) => {
        dispatch(fetchReposRequest());
        return fetchJsonp(API_REPOS,{
            type:'jsonp',
            jsonpCallback: 'callback',
        })
            .then((response) => response.json())
            .then((json) => {
                dispatch(fetchReposSuccess(json));
            })
            .catch(function (error) {
                dispatch(fetchReposFailure());
            });
    };
}
