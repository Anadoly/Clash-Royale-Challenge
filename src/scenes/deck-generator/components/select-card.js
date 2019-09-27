import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

import CardsTabs from './tabs';
import { CloseIcon, addIcon } from '@images';

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

const CloseButton = styled.button`
  display: block;
  margin-left: auto;
  width: 35px;
  height: 35px;
  border: none;
  background: none;
  cursor: pointer;
`;
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

export default class SelectCard extends PureComponent {
  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards`)
      .then(response => response.json())
      .then(data => this.generateRarityArray(data))
      .catch(err => alert(err));
  }

  static propTypes = {};
  state = {
    modalIsOpen: false,
    common: [],
    rare: [],
    epic: [],
    legendary: [],
  };

  generateRarityArray = cards => {
    const common = [];
    const rare = [];
    const epic = [];
    const legendary = [];

    cards.forEach(card => {
      switch (card.rarity) {
        case 'Common':
          card.level = 1;
          common.push(card);
          break;
        case 'Rare':
          card.level = 3;
          rare.push(card);
          break;
        case 'Epic':
          card.level = 6;
          epic.push(card);
          break;
        case 'Legendary':
          card.level = 9;
          legendary.push(card);
          break;
        default:
          break;
      }
    });

    this.setState({ common, rare, epic, legendary });
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  render() {
    const { common, rare, epic, legendary, modalIsOpen } = this.state;
    const { handleingAddedCard, selectMode } = this.props;
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
SelectCard.propTypes = {
  handleingAddedCard: PropTypes.func.isRequired,
  selectMode: PropTypes.bool,
};
