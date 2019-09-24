import React, { Component } from 'react';
import { default as Cards } from './components/cards';
import styled from '@emotion/styled/macro';

import { Container, Title } from '@utilities';

const DeckGeneratorWrapper = styled.div`
  ${Container}
`;

const H1 = styled.h1`
  ${Title}
`;

export default class DeckGenerator extends Component {
  state = {
    cards: null,
  };
  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACK_END_API}/api/cards`)
      .then(response => response.json())
      .then(data => this.setState({ cards: this.cardArrayGenerator(data) }));
  }

  cardArrayGenerator = cards => {
    const LenthOfArryGenerated = 8;
    const shuffledCards = cards.sort(function() {
      return 0.8 - Math.random();
    });
    const selectedCards = shuffledCards.slice(0, LenthOfArryGenerated);
    return selectedCards;
  };
  render() {
    const { cards } = this.state;
    return (
      <DeckGeneratorWrapper>
        <H1>DeckGenerator</H1>
        {!cards && <p>Loading...</p>}
        {cards && <Cards cards={cards} />}
      </DeckGeneratorWrapper>
    );
  }
}
