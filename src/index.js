import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer'
import reducer2 from './store/reducer2'

/////////////////   REDUX   /////////////////////
const rootReducer = combineReducers({
    reducer1: reducer,
    reducer2: reducer2
})
const store = createStore(rootReducer)
/////////////////   REDUX   /////////////////////

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
