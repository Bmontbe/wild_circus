import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Component/Home/Home';
import Story from './Component/Story/Story';
import Shows from './Component/Shows/Shows';
import Account from './Component/Account/Account';
import Basket from './Component/Basket/Basket';
import NavigationBar from './Component/NavigationBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NavigationBar/>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
        <Route path={`${process.env.PUBLIC_URL}/histoire`} component={Story} />
        <Route path={`${process.env.PUBLIC_URL}/spectacles`} component={Shows} />
        <Route path={`${process.env.PUBLIC_URL}/compte`} component={Account} />
        <Route path={`${process.env.PUBLIC_URL}/panier`} component={Basket} />
      </Switch>
      </header>
    </div>
  );
}

export default App;
