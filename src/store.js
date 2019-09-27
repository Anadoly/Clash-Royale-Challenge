import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import roodReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  roodReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
