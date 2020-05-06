import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route path="*" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
