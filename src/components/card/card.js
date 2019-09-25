import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

import { colors } from '@utilities';
import { Elixir, RemoveIcon } from '@images';

const CardWarpper = styled.div`
  width: ${props => (props.selectMode ? '75px' : '150px')};
  height: ${props => (props.selectMode ? '100px' : '200px')};
  position: relative;
  margin: 20px;
  color: ${colors.primaryColor};
`;

const CardA = styled.a`
  width: 100%;
  height: 100%;
  color: inherit;
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
`;

const CardElixir = styled.p`
  background: url(${Elixir}) 50% 50% no-repeat;
  width: 40px;
  height: 40px;
  position: absolute;
  background-size: cover;
  top: ${props => (props.level === 9 ? '-10px' : '-30px')};
  left: -10px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  font-weight: 900;
`;

const CardLevel = styled.p`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-weight: 900;
  font-size: ${props => (props.selectMode ? '12px' : '24px')};
  margin: 0;
  padding-bottom: ${props => (props.level === 9 ? '20px' : '10px')};
  background: ${props => (props.level === 9 ? '' : 'rgba(0, 0, 0, 0.5)')};
  border-radius: ${props => (props.level === 9 ? '0' : ' 0 0 20px 20px')};
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: absolute;
  right: -15px;
  top: ${props => (props.level === 9 ? '7px' : '-10px')};
`;

const Card = props => {
  const { card, selectMode, canRemove } = props;

  const handleAddCard = (card, selectMode) => {
    if (!selectMode) {
      return;
    } else {
      props.handleingAddedCard(card);
    }
  };
  const handleRemoveCard = card => {
    props.handleingRemoveCard(card);
  };
  return (
    <CardWarpper key={card._id} selectMode={selectMode}>
      <CardA
        href={selectMode ? '#!' : `card/${card.idName}`}
        onClick={() => handleAddCard(card, selectMode)}
      >
        <CardImg
          src={`${process.env.REACT_APP_BACK_END_API}/images/cards/${card.idName}.png`}
          alt={card.idName}
        />
        <CardElixir level={card.level}>{card.elixirCost}</CardElixir>
        <CardLevel level={card.level} selectMode={selectMode}>
          {card.level === 9 ? `Lvl ${card.level}` : `Level ${card.level}`}
        </CardLevel>
      </CardA>
      {canRemove && handleRemoveCard && (
        <RemoveButton level={card.level} onClick={() => handleRemoveCard(card)}>
          <img src={RemoveIcon} alt="Close Button" />
        </RemoveButton>
      )}
    </CardWarpper>
  );
};

export default Card;

Card.propTypes = {
  card: PropTypes.object.isRequired,
  selectMode: PropTypes.bool,
  handleingAddedCard: PropTypes.func,
  handleingRemoveCard: PropTypes.func,
  canRemove: PropTypes.bool,
};
