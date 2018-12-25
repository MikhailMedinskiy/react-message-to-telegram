import {
    createStore, combineReducers, applyMiddleware, compose,
  } from 'redux';
  import thunk from 'redux-thunk';
  import postListReducer from './../../reducers/postListReducer'

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  export default () => {
    const store = createStore(
      combineReducers({
        posts: postListReducer
      }),
      composeEnhancers(applyMiddleware(thunk)),
    );
  
    return store;
  };
  