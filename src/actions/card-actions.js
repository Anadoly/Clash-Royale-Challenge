import { FETCH_CARD, FETCH_CARDS } from './types';
import { shuffledCards, sharedCardsArray } from '@utilities';

export const fetchCards = () => dispatch => {
  fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards`)
    .then(response => response.json())
    .then(cards =>
      dispatch({
        type: FETCH_CARDS,
        payload: shuffledCards(cards),
      })
    )
    .catch(err => alert(err));
};

export const fetchSharedCards = cardsIds => dispatch => {
  fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards`)
    .then(response => response.json())
    .then(cards =>
      dispatch({
        type: FETCH_CARDS,
        payload: sharedCardsArray(cards, cardsIds),
      })
    )
    .catch(err => alert(err));
};

export const fetchCard = idName => dispatch => {
  fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards/${idName}`)
    .then(response => response.json())
    .then(card =>
      dispatch({
        type: FETCH_CARD,
        payload: card,
      })
    );
};
