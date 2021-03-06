import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import {
  fetchCards,
  fetchSharedCards,
  addCard,
  removeCard,
  clearDeck,
} from '@actions/card-actions';
import { Container, Title, colors, CloseButton, Loading } from '@utilities';
import { CloseIcon } from '@images';
import { default as Cards } from './components/cards';
import { default as DeckStatistics } from './components/deck-statistics';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '300px',
  },
};

const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  margin: 20px auto;
  background-color: rgb(247, 107, 181);
  border-radius: 20px;
  color: ${colors.primaryColor};
  text-decoration: none;
  font-size: 16px;
  line-height: 1.5;
  min-width: 180px;
  border: rgb(247, 107, 181);
  cursor: pointer;
`;
const DeckGeneratorWrapper = styled.div`
  ${Container}
`;

const H1 = styled.h1`
  ${Title}
`;

const SelectModeButtonWrapper = styled.div`
  display: block;
  text-align: center;
`;

const SharedLink = styled.p`
  max-width: 350px;
  text-align: center;
  fons-size: 16px;
  a {
    color: inherit;
    font-weight: bold;
  }
`;

Modal.setAppElement('#root');

class DeckGenerator extends Component {
  state = {
    cards: [],
    selectMode: false,
    canRemove: false,
    cardsIds: [],
    modalIsOpen: false,
  };

  componentDidMount() {
    const {
      location: { search },
      fetchCards,
      fetchSharedCards,
    } = this.props;

    if (search !== '') {
      const values = queryString.parse(search);
      const cardsIds = values.cards.split(',');
      fetchSharedCards(cardsIds);
    } else {
      fetchCards();
    }
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  shareDeck = cards => {
    const cardsIds = [];
    cards.forEach(card => {
      cardsIds.push(card._id);
    });
    this.setState({ cardsIds, modalIsOpen: true });
  };
  handleSelectMode = () => {
    this.props.clearDeck();
    this.setState({ selectMode: true, canRemove: true });
  };
  handleingAddedCard = card => {
    const { cards, addCard } = this.props;

    if (cards.includes(card)) {
      return alert(`you can't add same card twice`);
    } else {
      addCard(card);
    }
  };
  handleingRemoveCard = removedCard => {
    this.props.removeCard(removedCard);
  };
  render() {
    const { selectMode, canRemove, modalIsOpen, cardsIds } = this.state;
    const { cards } = this.props;
    const cardNotEmpty = cards.length > 0;

    return (
      <DeckGeneratorWrapper>
        <H1>Deck Generator</H1>
        {!cardNotEmpty && !selectMode && <Loading />}
        <Cards
          cards={cards}
          selectMode={selectMode}
          handleingAddedCard={this.handleingAddedCard}
          handleingRemoveCard={this.handleingRemoveCard}
          canRemove={canRemove}
        />
        {cardNotEmpty && <DeckStatistics cards={cards} />}
        {!selectMode && (
          <SelectModeButtonWrapper>
            <Button onClick={this.handleSelectMode}>Select Mode</Button>
          </SelectModeButtonWrapper>
        )}
        {cards.length === 8 && (
          <SelectModeButtonWrapper>
            <Button onClick={() => this.shareDeck(cards)}>
              Share Your Deck
            </Button>
          </SelectModeButtonWrapper>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Card Modal"
        >
          <CloseButton onClick={this.closeModal}>
            <img src={CloseIcon} alt="Close Button" />
          </CloseButton>
          {cardsIds && (
            <SharedLink>
              Your Deck on{' '}
              <Link to={`?cards=${cardsIds}`} target="_blank">
                Here
              </Link>
            </SharedLink>
          )}
        </Modal>
      </DeckGeneratorWrapper>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cards.cards,
});

export default connect(
  mapStateToProps,
  { fetchCards, fetchSharedCards, addCard, removeCard, clearDeck }
)(DeckGenerator);

DeckGenerator.propTypes = {
  location: PropTypes.object,
  cards: PropTypes.array,
  fetchCards: PropTypes.func.isRequired,
  fetchSharedCards: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  clearDeck: PropTypes.func.isRequired,
};
