import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalStyles } from '@utilities';
import { DeckGenerator, CardDeatils } from '@scenes';

function App() {
  return (
    <section>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={DeckGenerator} />
        <Route exact path="/select-mode" component={DeckGenerator} />
        <Route exact path="/card/:idName" component={CardDeatils} />
      </Switch>
    </section>
  );
}

export default App;
