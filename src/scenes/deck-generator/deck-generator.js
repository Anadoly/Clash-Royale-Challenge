import React, { Component } from 'react';
import { default as Cards } from './components/cards';
import styled from '@emotion/styled/macro';

import { Container, Title } from '@utilities';

const DeckGeneratorWrapper = styled.div`
  ${Container}
`;

const H1 = styled.h1`
  ${Title}
`;

export default class DeckGenerator extends Component {
  state = {
    cards: null,
    deckStatistics: null,
  };
  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards`)
      .then(response => response.json())
      .then(data => this.cardArrayGenerator(data));
  }

  deckStatistics = cards => {
    const ElixirCostStatistics = this.averageElixirCost(cards);
    const cycleCostStatistics = this.minimumCycleCost(cards);
    const cardTypes = this.cardTypes(cards);
    const cardRarities = this.cardRarities(cards);
    this.setState({
      cards,
      deckStatistics: {
        ElixirCostStatistics,
        cycleCostStatistics,
        cardTypes,
        cardRarities,
      },
    });
  };

  averageElixirCost = cards => {
    const ElixirCostStatistics = {};
    ElixirCostStatistics.totalCost = 0;
    cards.forEach(card => {
      ElixirCostStatistics.totalCost += card.elixirCost;
    });
    ElixirCostStatistics.averageElixirCost = ElixirCostStatistics.totalCost / 8;
    return ElixirCostStatistics;
  };

  minimumCycleCost = cards => {
    const cycleCostStatistics = {};
    const cycleCost = [];
    cards.forEach(card => {
      cycleCost.push(card.elixirCost);
    });
    const sortingCycleCost = cycleCost.sort((a, b) => (a < b ? -1 : 1));
    cycleCostStatistics.totalCost = sortingCycleCost.reduce((a, b) => a + b, 0);
    const minmumCycle = sortingCycleCost.slice(0, 4);
    cycleCostStatistics.minimumCycleCost = minmumCycle.reduce(
      (a, b) => a + b,
      0
    );
    return cycleCostStatistics;
  };

  cardTypes = cards => {
    const cardTypes = {
      troop: 0,
      spell: 0,
      building: 0,
    };

    cards.forEach(card => {
      switch (card.type) {
        case 'Troop':
          cardTypes.troop++;
          break;
        case 'Spell':
          cardTypes.spell++;
          break;
        case 'Building':
          cardTypes.building++;
          break;
        default:
          break;
      }
    });
    return cardTypes;
  };

  cardRarities = cards => {
    const cardRarities = {
      common: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
    };

    cards.forEach(card => {
      switch (card.rarity) {
        case 'Common':
          cardRarities.common++;
          break;
        case 'Rare':
          cardRarities.rare++;
          break;
        case 'Epic':
          cardRarities.epic++;
          break;
        case 'Legendary':
          cardRarities.legendary++;
          break;
        default:
          break;
      }
    });
    return cardRarities;
  };

  cardArrayGenerator = cards => {
    const LenthOfArryGenerated = 8;
    const shuffledCards = cards.sort(function() {
      return 0.8 - Math.random();
    });
    const selectedCards = shuffledCards.slice(0, LenthOfArryGenerated);
    this.deckStatistics(selectedCards);
    return selectedCards;
  };

  render() {
    const { cards, deckStatistics } = this.state;
    console.log(deckStatistics);
    return (
      <DeckGeneratorWrapper>
        <H1>DeckGenerator</H1>
        {!cards && <p>Loading...</p>}
        {cards && <Cards cards={cards} />}
      </DeckGeneratorWrapper>
    );
  }
}
