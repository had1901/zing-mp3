import { createStore, applyMiddleware, compose  } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './../reducer/reducer';
 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // Create Store
  let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  

  export default store 