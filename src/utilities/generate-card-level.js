const generateCardLevel = cards => {
  cards.forEach(card => {
    switch (card.rarity) {
      case 'Common':
        card.level = 1;
        break;
      case 'Rare':
        card.level = 3;
        break;
      case 'Epic':
        card.level = 6;
        break;
      case 'Legendary':
        card.level = 9;
        break;
      default:
        break;
    }
  });
  return cards;
};

export default generateCardLevel;
