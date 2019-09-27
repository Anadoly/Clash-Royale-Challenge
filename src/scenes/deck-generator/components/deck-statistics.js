import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

import { colors, handlePercent } from '@utilities';

const StatisticsBar = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid #000;
  border-radius: 10px;
  background: ${colors.primaryColor};
  margin: 15px auto;
  position: relative;
  max-width: 760px;
  & > div {
    border: 1px solid #000;
  }
  & div:first-of-type {
    border-radius: 10px 0 0 10px;
  }
  & div + div:last-child {
    border-radius: 0 10px 10px 0;
  }
`;

const StatisticsItem = styled.div`
  display: inline-block;
  width: ${props => `${props.width}%`};
  background-color: ${props => `${props.color}`};
  position: relative;
  top: -3px;
  p {
    padding: 0 10px;
    color: ${colors.primaryColor};
    margin: 0;
    font-size: 12px;
    line-height: 20px;
    font-weight: 900;
  }
`;

const averageElixirCost = cards => {
  const cardsCount = cards.length;
  const ElixirCostStatistics = {};
  ElixirCostStatistics.totalCost = 0;
  cards.forEach(card => {
    ElixirCostStatistics.totalCost += card.elixirCost;
  });
  ElixirCostStatistics.averageElixirCost =
    ElixirCostStatistics.totalCost / cardsCount;
  ElixirCostStatistics.averageElixirCostPercentage = handlePercent(
    ElixirCostStatistics.averageElixirCost,
    ElixirCostStatistics.totalCost
  );
  return ElixirCostStatistics;
};

const minimumCycleCost = cards => {
  const cycleCostStatistics = {};
  const cycleCost = [];
  cards.forEach(card => {
    cycleCost.push(card.elixirCost);
  });
  const sortingCycleCost = cycleCost.sort((a, b) => (a < b ? -1 : 1));
  cycleCostStatistics.totalCost = sortingCycleCost.reduce((a, b) => a + b, 0);
  const minmumCycle = sortingCycleCost.slice(0, 4);
  cycleCostStatistics.minimumCycleCost = minmumCycle.reduce((a, b) => a + b, 0);
  cycleCostStatistics.minimumCycleCostPercentage = handlePercent(
    cycleCostStatistics.minimumCycleCost,
    cycleCostStatistics.totalCost
  );
  return cycleCostStatistics;
};

const cardTypesFunc = cards => {
  const cardsCount = cards.length;
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
  cardTypes.troopPercentage = handlePercent(cardTypes.troop, cardsCount);
  cardTypes.spellPercentage = handlePercent(cardTypes.spell, cardsCount);
  cardTypes.buildingPercentage = handlePercent(cardTypes.building, cardsCount);

  return cardTypes;
};

const cardRaritiesFunc = cards => {
  const cardsCount = cards.length;
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
  cardRarities.commonPercentage = handlePercent(
    cardRarities.common,
    cardsCount
  );
  cardRarities.rarePercentage = handlePercent(cardRarities.rare, cardsCount);
  cardRarities.epicPercentage = handlePercent(cardRarities.epic, cardsCount);
  cardRarities.legendaryPercentage = handlePercent(
    cardRarities.legendary,
    cardsCount
  );
  return cardRarities;
};

const deckStatistics = cards => {
  const cardsCount = cards.length;
  const elixirCostStatistics = averageElixirCost(cards, cardsCount);
  const cycleCostStatistics = minimumCycleCost(cards);
  const cardTypes = cardTypesFunc(cards, cardsCount);
  const cardRarities = cardRaritiesFunc(cards, cardsCount);
  return {
    elixirCostStatistics,
    cycleCostStatistics,
    cardTypes,
    cardRarities,
  };
};

const DeckStatistics = props => {
  const { cards } = props;
  const {
    elixirCostStatistics,
    cycleCostStatistics,
    cardTypes,
    cardRarities,
  } = deckStatistics(cards);

  return (
    <>
      {elixirCostStatistics &&
        cycleCostStatistics &&
        cardTypes &&
        cardRarities && (
          <>
            <StatisticsBar>
              <StatisticsItem
                width={elixirCostStatistics.averageElixirCostPercentage}
                color={'rgb(0, 134, 191)'}
              >
                <p>{elixirCostStatistics.averageElixirCost}</p>
              </StatisticsItem>
            </StatisticsBar>
            <StatisticsBar>
              <StatisticsItem
                width={cycleCostStatistics.minimumCycleCostPercentage}
                color={'rgb(0, 134, 191)'}
              >
                <p>{cycleCostStatistics.minimumCycleCost}</p>
              </StatisticsItem>
            </StatisticsBar>
            <StatisticsBar>
              {cardTypes.troop > 0 && (
                <StatisticsItem
                  width={cardTypes.troopPercentage}
                  color={'rgb(0, 134, 191)'}
                >
                  <p>{cardTypes.troop} Troop</p>
                </StatisticsItem>
              )}
              {cardTypes.spell > 0 && (
                <StatisticsItem
                  width={cardTypes.spellPercentage}
                  color={'rgb(149, 127, 211)'}
                >
                  <p>{cardTypes.spell} Spell</p>
                </StatisticsItem>
              )}
              {cardTypes.building > 0 && (
                <StatisticsItem
                  width={cardTypes.buildingPercentage}
                  color={'rgb(247, 107, 181)'}
                >
                  <p>{cardTypes.building} Building</p>
                </StatisticsItem>
              )}
            </StatisticsBar>
            <StatisticsBar>
              {cardRarities.common > 0 && (
                <StatisticsItem
                  width={cardRarities.commonPercentage}
                  color={'rgb(0, 134, 191)'}
                >
                  <p>{cardRarities.common} Common</p>
                </StatisticsItem>
              )}
              {cardRarities.rare > 0 && (
                <StatisticsItem
                  width={cardRarities.rarePercentage}
                  color={'rgb(149, 127, 211)'}
                >
                  <p>{cardRarities.rare} Rare</p>
                </StatisticsItem>
              )}
              {cardRarities.epic > 0 && (
                <StatisticsItem
                  width={cardRarities.epicPercentage}
                  color={'rgb(247, 107, 181)'}
                >
                  <p>{cardRarities.epic} Epic</p>
                </StatisticsItem>
              )}
              {cardRarities.legendary > 0 && (
                <StatisticsItem
                  width={cardRarities.legendaryPercentage}
                  color={'rgb(255, 112, 113)'}
                >
                  <p>{cardRarities.legendary} Legendary</p>
                </StatisticsItem>
              )}
            </StatisticsBar>
          </>
        )}
    </>
  );
};

DeckStatistics.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default DeckStatistics;
