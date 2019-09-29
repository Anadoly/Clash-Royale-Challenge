import generateCardLevel from './generate-card-level';

const sharedCardsArray = (cardsArr, cardsIds) => {
  const cards = [];
  cardsIds.forEach(cardId => {
    const card = cardsArr.filter(card => {
      return cardId === card._id;
    });
    cards.push(card[0]);
  });
  return generateCardLevel(cards);
};

export default sharedCardsArray;
