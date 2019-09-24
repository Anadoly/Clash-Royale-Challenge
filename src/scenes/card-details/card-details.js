import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

import { Container, Title, colors } from '@utilities';

const CardDeatilsWrapper = styled.div`
  ${Container}
`;

const H1 = styled.h1`
  ${Title}
`;

const CardWrapper = styled.div`
  display: flex;
`;

const CardInfo = styled.p`
  color: ${colors.primaryColor};
  font-size: 18px;
  font-weight: bold;
  span {
    font-weight: normal;
  }
`;

const CardInfoWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;
`;

const CardImgWrapper = styled.div`
  width: 50%;
  padding-left: 10px;
  min-height: 500px;
`;

const CardImg = styled.img`
  width: 100%;
`;

export default class CardDeatils extends PureComponent {
  state = {
    card: null,
  };

  componentDidMount() {
    const {
      match: { path },
    } = this.props;
    if (path === '/card/:idName') {
      const {
        match: {
          params: { idName },
        },
      } = this.props;
      fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards/${idName}`)
        .then(response => response.json())
        .then(response => this.setState({ card: response }));
    }
  }

  render() {
    const { card } = this.state;

    return (
      <section>
        {!card && <p>Loading...</p>}
        {card && (
          <CardDeatilsWrapper>
            <H1>{card.name}</H1>
            <CardWrapper>
              <CardInfoWrapper>
                <CardInfo>
                  Rarity: <span>{card.rarity}</span>
                </CardInfo>
                <CardInfo>
                  Type: <span>{card.type}</span>
                </CardInfo>
                <CardInfo>
                  Description: <span>{card.description}</span>
                </CardInfo>
                <CardInfo>
                  Elixir Cost: <span>{card.elixirCost}</span>
                </CardInfo>
              </CardInfoWrapper>
              <CardImgWrapper>
                <CardImg
                  src={`${process.env.REACT_APP_BACK_END_API}/images/cards/${card.idName}.png`}
                  alt={card.idName}
                />
              </CardImgWrapper>
            </CardWrapper>
          </CardDeatilsWrapper>
        )}
      </section>
    );
  }
}

CardDeatils.propTypes = {
  match: PropTypes.object.isRequired,
};
