import { combineReducers } from 'redux';
import events from './events';
import settings from './settings';
import repos from './repos';

const app = combineReducers({
    events,
    repos,
    settings
});

export default app;
