import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

import { colors } from '@utilities';
import { Elixir } from '@images';

const CardWarpper = styled.div`
  width: 150px;
  height: 200px;
  position: relative;
  margin: 20px;
  color: ${colors.primaryColor};
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
  z-index: 2;
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
  font-size: 24px;
  margin: 0;
  padding-bottom: ${props => (props.level === 9 ? '20px' : '10px')};
  background: ${props => (props.level === 9 ? '' : 'rgba(0, 0, 0, 0.5)')};
  border-radius: ${props => (props.level === 9 ? '0' : ' 0 0 20px 20px')};
`;

const Card = props => (
  <CardWarpper key={props.card._id}>
    <CardImg
      src={`${process.env.REACT_APP_BACK_END_API}/images/cards/${props.card.idName}.png`}
      alt={props.card.idName}
    />
    <CardElixir level={props.card.level}>{props.card.elixirCost}</CardElixir>
    <CardLevel level={props.card.level}>
      {props.card.level === 9
        ? `Lvl ${props.card.level}`
        : `Level ${props.card.level}`}
    </CardLevel>
  </CardWarpper>
);

export default Card;

Card.propTypes = {
  card: PropTypes.object.isRequired,
};
