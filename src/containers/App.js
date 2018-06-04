import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Nav, Home } from './../components';
import { Battle, Results, Popular } from './';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/battle" component={Battle} />
          <Route path="/battle/results" component={Results} />
          <Route path="/popular" component={Popular} />
          <Route render={() => <p>Not Found</p>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
