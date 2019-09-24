import React from 'react';
import PropTypes from 'prop-types';

const Card = props => (
  <div key={props.card._id}>
    <p>name: {props.card.idName}</p>
    <p>elixirCost: {props.card.elixirCost}</p>
    <p>Card level: {props.card.level}</p>
    <img
      src={`${process.env.REACT_APP_BACK_END_API}/images/cards/${props.card.idName}.png`}
      alt={props.card.idName}
    />
  </div>
);

export default Card;

Card.propTypes = {
  card: PropTypes.object.isRequired,
};
