import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import mainReducer from './store/reducers/mainReducer';
import menuReducer from './store/reducers/menuReducer';
import formReducer from './store/reducers/orderFormReducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import orderFormReducer from './store/reducers/orderFormReducer';


// import reducer from './store/reducer'
// import reducer2 from './store/reducer2'
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    menu: menuReducer,
    main: mainReducer, 
    form: orderFormReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


/////////////////   REDUX   /////////////////////

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
