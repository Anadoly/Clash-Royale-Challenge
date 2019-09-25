import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import CardsTabs from './tabs';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '760px',
    height: '500px',
    zIndex: '10',
  },
};

Modal.setAppElement('#root');

export default class SelectCard extends PureComponent {
  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards`)
      .then(response => response.json())
      .then(data => this.generateRarityArray(data));
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
    const { common, rare, epic, legendary } = this.state;
    const { handleingAddedCard } = this.props;
    return (
      <div>
        <button onClick={this.openModal}> Add New Card</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Card Modal"
        >
          <button onClick={this.closeModal}>close</button>
          <CardsTabs
            tabs={[common, rare, epic, legendary]}
            handleingAddedCard={handleingAddedCard}
          />
        </Modal>
      </div>
    );
  }
}
SelectCard.propTypes = {
  handleingAddedCard: PropTypes.func.isRequired,
};
