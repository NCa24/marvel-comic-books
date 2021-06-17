import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import routes from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              render={() => <route.component />}
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
