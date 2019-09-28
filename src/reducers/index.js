import { combineReducers } from 'redux';
import cardReducer from './card-reducer';

export default combineReducers({
  cards: cardReducer,
});
