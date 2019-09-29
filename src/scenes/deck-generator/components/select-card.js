import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { connect } from 'react-redux';

import CardsTabs from './tabs';
import { CloseIcon, addIcon } from '@images';
import { CloseButton, generateRarityArray } from '@utilities';
import { fetchAllCards } from '@actions/card-actions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '500px',
    zIndex: '10',
  },
};

const AddCard = styled.button`
  width: 150px;
  height: 200px;
  margin: 20px;
  cursor: pointer;
  border: dashed rgba(127, 127, 127, 1);
  background: #fff;
  img {
    width: 40px;
    height: 40px;
  }
`;
Modal.setAppElement('#root');

class SelectCard extends PureComponent {
  componentDidMount() {
    this.props.fetchAllCards();
  }

  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  render() {
    const { modalIsOpen } = this.state;
    const { handleingAddedCard, selectMode, cards } = this.props;
    const { common, rare, epic, legendary } = generateRarityArray(cards);
    return (
      <div>
        <AddCard onClick={this.openModal}>
          <img src={addIcon} alt="Close Button" />
        </AddCard>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Card Modal"
        >
          <CloseButton onClick={this.closeModal}>
            <img src={CloseIcon} alt="Close Button" />
          </CloseButton>
          <CardsTabs
            tabs={[common, rare, epic, legendary]}
            handleingAddedCard={handleingAddedCard}
            selectMode={selectMode}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cards: state.cards.allCards,
});

export default connect(
  mapStateToProps,
  { fetchAllCards }
)(SelectCard);

SelectCard.propTypes = {
  handleingAddedCard: PropTypes.func.isRequired,
  selectMode: PropTypes.bool,
  cards: PropTypes.array.isRequired,
  fetchAllCards: PropTypes.func.isRequired,
};
