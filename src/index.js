import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

//REDUCERS
import indexResaReducer from './indexResaReducer';
import basketReducer from './basketReducer';
import placesReducer from './placesReducer';

const allReducers = combineReducers({
  indexResa: indexResaReducer,
  basket: basketReducer,
  places: placesReducer
})

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
