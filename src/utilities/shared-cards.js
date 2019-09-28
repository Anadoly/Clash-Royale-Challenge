const sharedCardsArray = (cardsArr, cardsIds) => {
  const cards = [];
  cardsIds.forEach(cardId => {
    const card = cardsArr.filter(card => {
      return cardId === card._id;
    });
    cards.push(card[0]);
  });
  return cards;
};

export default sharedCardsArray;
