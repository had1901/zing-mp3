import { createStore, applyMiddleware  } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './../reducer/reducer';
 
 
  // Create Store
  let store = createStore(rootReducer, applyMiddleware(thunk))
  

  export default store 