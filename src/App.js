import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Component/Home/Home';
import Story from './Component/Story/Story';
import Shows from './Component/Shows/Shows';
import Basket from './Component/Basket/Basket';
import NavigationBar from './Component/NavigationBar';
import AdminSpace from './Component/AdminSpace/AdminSpace';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
        <Route path={`${process.env.PUBLIC_URL}/histoire`} component={Story} />
        <Route path={`${process.env.PUBLIC_URL}/spectacles`} component={Shows} />
        <Route path={`${process.env.PUBLIC_URL}/espaceAdmin`} component={AdminSpace} />
        <Route path={`${process.env.PUBLIC_URL}/panier`} component={Basket} />
      </Switch>

    </div>
  );
}

export default App;
