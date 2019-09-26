import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import queryString from 'query-string';

import { default as Cards } from './components/cards';
import { default as DeckStatistics } from './components/deck-statistics';
import { Container, Title, colors } from '@utilities';
import { Logo } from '@images';

const DeckGeneratorWrapper = styled.div`
  ${Container}
`;

const H1 = styled.h1`
  ${Title}
`;

const Header = styled.a`
  text-align: center;
  margin: 25px auto;
  display: block;
`;

const SelectModeButtonWrapper = styled.div`
  display: block;
  text-align: center;
`;

const SelectModeButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  margin: 20px auto;
  background-color: rgb(247, 107, 181);
  border-radius: 20px;
  color: ${colors.primaryColor};
  text-decoration: none;
`;

export default class DeckGenerator extends Component {
  state = {
    cards: [],
    deckStatistics: null,
    selectMode: false,
    canRemove: false,
    cardsIds: [],
  };
  componentDidMount() {
    const {
      match: { path },
      location: { search },
    } = this.props;
    if (path === '/select-mode') {
      this.setState({ selectMode: true, canRemove: true });
    } else if (search !== '') {
      const values = queryString.parse(search);
      const cardsIds = values.cards.split(',');
      fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards`)
        .then(response => response.json())
        .then(data => this.sharedCardsArray(data, cardsIds))
        .catch(err => alert(err));
    } else {
      fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards`)
        .then(response => response.json())
        .then(data => this.cardArrayGenerator(data))
        .catch(err => alert(err));
    }
  }

  sharedCardsArray = (cardsArr, cardsIds) => {
    const cards = [];
    cardsIds.forEach(cardId => {
      const card = cardsArr.filter(card => {
        return cardId === card._id;
      });
      cards.push(card[0]);
    });
    this.deckStatistics(cards, cards.length);
  };
  deckStatistics = (cards, cardsCount) => {
    const cardsIds = [];
    cards.forEach(card => {
      cardsIds.push(card._id);
    });
    if (cardsCount > 0) {
      const elixirCostStatistics = this.averageElixirCost(cards, cardsCount);
      const cycleCostStatistics = this.minimumCycleCost(cards);
      const cardTypes = this.cardTypes(cards, cardsCount);
      const cardRarities = this.cardRarities(cards, cardsCount);
      this.setState({
        cards,
        deckStatistics: {
          elixirCostStatistics,
          cycleCostStatistics,
          cardTypes,
          cardRarities,
        },
        cardsIds,
      });
    } else {
      this.setState({
        cards,
        deckStatistics: null,
        cardsIds,
      });
    }
  };

  averageElixirCost = (cards, cardsCount) => {
    const ElixirCostStatistics = {};
    ElixirCostStatistics.totalCost = 0;
    cards.forEach(card => {
      ElixirCostStatistics.totalCost += card.elixirCost;
    });
    ElixirCostStatistics.averageElixirCost =
      ElixirCostStatistics.totalCost / cardsCount;
    ElixirCostStatistics.averageElixirCostPercentage = this.handlePercent(
      ElixirCostStatistics.averageElixirCost,
      ElixirCostStatistics.totalCost
    );
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
    cycleCostStatistics.minimumCycleCostPercentage = this.handlePercent(
      cycleCostStatistics.minimumCycleCost,
      cycleCostStatistics.totalCost
    );
    return cycleCostStatistics;
  };

  cardTypes = (cards, cardsCount) => {
    const cardTypes = {
      troop: 0,
      troopPercentage: 0,
      spell: 0,
      spellPercentage: 0,
      building: 0,
      buildingPercentage: 0,
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
    cardTypes.troopPercentage = this.handlePercent(cardTypes.troop, cardsCount);
    cardTypes.spellPercentage = this.handlePercent(cardTypes.spell, cardsCount);
    cardTypes.buildingPercentage = this.handlePercent(
      cardTypes.building,
      cardsCount
    );

    return cardTypes;
  };

  cardRarities = (cards, cardsCount) => {
    const cardRarities = {
      common: 0,
      commonPercentage: 0,
      rare: 0,
      rarePercentage: 0,
      epic: 0,
      epicPercentage: 0,
      legendary: 0,
      legendaryPercentage: 0,
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
    cardRarities.commonPercentage = this.handlePercent(
      cardRarities.common,
      cardsCount
    );
    cardRarities.rarePercentage = this.handlePercent(
      cardRarities.rare,
      cardsCount
    );
    cardRarities.epicPercentage = this.handlePercent(
      cardRarities.epic,
      cardsCount
    );
    cardRarities.legendaryPercentage = this.handlePercent(
      cardRarities.legendary,
      cardsCount
    );
    return cardRarities;
  };

  handlePercent = (number, totleNmber) => {
    return (number / totleNmber) * 100;
  };

  cardArrayGenerator = cards => {
    const LenthOfArryGenerated = 8;
    const shuffledCards = cards.sort(function() {
      return 0.8 - Math.random();
    });
    const selectedCards = shuffledCards.slice(0, LenthOfArryGenerated);
    this.deckStatistics(selectedCards, 8);
    return selectedCards;
  };

  handleingAddedCard = card => {
    const { cards } = this.state;
    if (cards.includes(card)) {
      return alert(`you can't add same card twice`);
    } else {
      cards.push(card);
      this.deckStatistics(cards, cards.length);
    }
  };
  handleingRemoveCard = removedCard => {
    const cards = this.state.cards.filter(function(card) {
      return removedCard._id !== card._id;
    });
    this.deckStatistics(cards, cards.length);
  };
  render() {
    const {
      cards,
      deckStatistics,
      selectMode,
      canRemove,
      cardsIds,
    } = this.state;

    return (
      <DeckGeneratorWrapper>
        <Header href="/">
          <img src={Logo} alt="Clash Royakye Logo" />
        </Header>
        <H1>DeckGenerator</H1>
        {!cards && <p>Loading...</p>}

        <Cards
          cards={cards}
          selectMode={selectMode}
          handleingAddedCard={this.handleingAddedCard}
          handleingRemoveCard={this.handleingRemoveCard}
          canRemove={canRemove}
        />
        {cards && deckStatistics && (
          <DeckStatistics deckStatistics={deckStatistics} />
        )}
        {!selectMode && (
          <SelectModeButtonWrapper>
            <SelectModeButton href="/select-mode">Select Mode</SelectModeButton>
          </SelectModeButtonWrapper>
        )}
        {cards.length === 8 && (
          <SelectModeButtonWrapper>
            <SelectModeButton href={`?cards=${cardsIds}`} target="_blank">
              Share Your Deck
            </SelectModeButton>
          </SelectModeButtonWrapper>
        )}
      </DeckGeneratorWrapper>
    );
  }
}

DeckGenerator.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};
