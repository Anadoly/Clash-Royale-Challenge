import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { connect } from 'react-redux';

import { fetchCard } from '@actions/card-actions';
import { Container, Title, colors, Loading } from '@utilities';

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

class CardDeatils extends PureComponent {
  componentDidMount() {
    if (this.props.match) {
      const {
        match: { path },
      } = this.props;

      if (path === '/card/:idName') {
        const {
          match: {
            params: { idName },
          },
          fetchCard,
        } = this.props;
        fetchCard(idName);
      }
    } else if (this.props.idName) {
      const { fetchCard, idName } = this.props;
      fetchCard(idName);
    }
  }

  render() {
    const { card } = this.props;
    const cardIsEmpty = Object.keys(card).length === 0;
    return (
      <section>
        {cardIsEmpty && <Loading />}
        {!cardIsEmpty && (
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

const mapStateToProps = state => ({
  card: state.cards.card,
});

export default connect(
  mapStateToProps,
  { fetchCard }
)(CardDeatils);

CardDeatils.propTypes = {
  match: PropTypes.object,
  fetchCard: PropTypes.func,
  card: PropTypes.object.isRequired,
  idName: PropTypes.string,
};
