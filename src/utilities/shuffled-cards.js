const shuffledCards = cards => {
  const LenthOfArryGenerated = 8;
  const shuffledCards = cards.sort(function() {
    return 0.8 - Math.random();
  });
  const selectedCards = shuffledCards.slice(0, LenthOfArryGenerated);
  return selectedCards;
};

export default shuffledCards;
