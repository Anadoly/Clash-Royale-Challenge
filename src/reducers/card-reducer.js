import {
  FETCH_CARD,
  FETCH_CARDS,
  ADD_CARD,
  REMOVE_CARD,
  CLEAR_DECK,
  FETCH_ALL_CARDS,
} from '@actions/types';

const initialState = {
  cards: [],
  card: {},
  allCards: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case FETCH_ALL_CARDS:
      return {
        ...state,
        allCards: action.payload,
      };
    case FETCH_CARD:
      return {
        ...state,
        card: action.payload,
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    case REMOVE_CARD:
      const cards = state.cards.filter(card => card !== action.payload);
      return {
        ...state,
        cards,
      };
    case CLEAR_DECK:
      return {
        ...state,
        cards: [],
      };
    default:
      return state;
  }
}
