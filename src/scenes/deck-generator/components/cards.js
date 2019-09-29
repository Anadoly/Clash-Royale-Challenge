import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

import { Card } from '@components';
import SelectCard from './select-card';

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 760px;
  margin: auto;
`;

const Cards = props => {
  const {
    cards,
    selectMode,
    handleingAddedCard,
    handleingRemoveCard,
    canRemove,
  } = props;

  return (
    <CardsWrapper>
      {cards.map(card => (
        <Card
          key={JSON.stringify(card)}
          card={card}
          handleingRemoveCard={handleingRemoveCard}
          canRemove={canRemove}
        />
      ))}
      {selectMode && cards.length < 8 && (
        <SelectCard
          handleingAddedCard={handleingAddedCard}
          selectMode={selectMode}
        />
      )}
    </CardsWrapper>
  );
};

export default Cards;

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  selectMode: PropTypes.bool.isRequired,
  handleingAddedCard: PropTypes.func,
  handleingRemoveCard: PropTypes.func,
  canRemove: PropTypes.bool,
};
