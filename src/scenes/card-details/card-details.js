import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    console.log(this.state.card);
    return (
      <div>
        <p>Card Details</p>
      </div>
    );
  }
}

CardDeatils.propTypes = {
  match: PropTypes.object.isRequired,
};
