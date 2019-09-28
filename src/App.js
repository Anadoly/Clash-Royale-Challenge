import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from '@emotion/styled/macro';

import { GlobalStyles } from '@utilities';
import { DeckGenerator, CardDeatils } from '@scenes';
import { Logo } from '@images';
import store from './store';

const Header = styled.a`
  text-align: center;
  margin: 25px auto;
  display: block;
`;

function App() {
  return (
    <Provider store={store}>
      <section>
        <Header href="/">
          <img src={Logo} alt="Clash Royakye Logo" />
        </Header>
        <GlobalStyles />
        <Switch>
          <Route exact path="/" component={DeckGenerator} />
          <Route exact path="/card/:idName" component={CardDeatils} />
        </Switch>
      </section>
    </Provider>
  );
}

export default App;
