const generateRarityArray = cards => {
  const common = [];
  const rare = [];
  const epic = [];
  const legendary = [];

  cards.forEach(card => {
    switch (card.rarity) {
      case 'Common':
        card.level = 1;
        common.push(card);
        break;
      case 'Rare':
        card.level = 3;
        rare.push(card);
        break;
      case 'Epic':
        card.level = 6;
        epic.push(card);
        break;
      case 'Legendary':
        card.level = 9;
        legendary.push(card);
        break;
      default:
        break;
    }
  });

  return { common, rare, epic, legendary };
};

export default generateRarityArray;
