import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@components';

const Cards = props => (
  <>
    {props.cards.map(card => {
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
          card.level = 0;
          break;
      }
      return <Card key={JSON.stringify(card)} card={card} />;
    })}
  </>
);

export default Cards;

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
};
