import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

import { colors } from '@utilities';

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
  & div:first-child {
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
const DeckStatistics = props => {
  const {
    deckStatistics: {
      elixirCostStatistics,
      cycleCostStatistics,
      cardTypes,
      cardRarities,
    },
  } = props;
  return (
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
            <p>{cardTypes.troop}</p>
          </StatisticsItem>
        )}
        {cardTypes.spell > 0 && (
          <StatisticsItem
            width={cardTypes.spellPercentage}
            color={'rgb(149, 127, 211)'}
          >
            <p>{cardTypes.spell}</p>
          </StatisticsItem>
        )}
        {cardTypes.building > 0 && (
          <StatisticsItem
            width={cardTypes.buildingPercentage}
            color={'rgb(247, 107, 181)'}
          >
            <p>{cardTypes.building}</p>
          </StatisticsItem>
        )}
      </StatisticsBar>
      <StatisticsBar>
        {cardRarities.common > 0 && (
          <StatisticsItem
            width={cardRarities.commonPercentage}
            color={'rgb(0, 134, 191)'}
          >
            <p>{cardRarities.common}</p>
          </StatisticsItem>
        )}
        {cardRarities.rare > 0 && (
          <StatisticsItem
            width={cardRarities.rarePercentage}
            color={'rgb(149, 127, 211)'}
          >
            <p>{cardRarities.rare}</p>
          </StatisticsItem>
        )}
        {cardRarities.epic > 0 && (
          <StatisticsItem
            width={cardRarities.epicPercentage}
            color={'rgb(247, 107, 181)'}
          >
            <p>{cardRarities.epic}</p>
          </StatisticsItem>
        )}
        {cardRarities.legendary > 0 && (
          <StatisticsItem
            width={cardRarities.legendaryPercentage}
            color={'rgb(255, 112, 113)'}
          >
            <p>{cardRarities.legendary}</p>
          </StatisticsItem>
        )}
      </StatisticsBar>
    </>
  );
};

DeckStatistics.propTypes = {
  deckStatistics: PropTypes.object.isRequired,
};

export default DeckStatistics;
