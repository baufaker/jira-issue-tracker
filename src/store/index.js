import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = {
    issues: []
};

export const store = createStore(reducer, initialState);