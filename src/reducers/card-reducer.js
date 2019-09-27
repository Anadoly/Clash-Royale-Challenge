import { FETCH_CARD, FETCH_CARDS } from '../actions/types';

const initialState = {
  cards: [],
  card: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case FETCH_CARD:
      return {
        ...state,
        card: action.payload,
      };
    default:
      return state;
  }
}
