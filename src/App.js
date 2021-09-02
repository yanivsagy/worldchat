import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import AccountActivation from './components/auth/AccountActivation';
import GoogleMaps from './components/map/GoogleMaps';
import EditProfile from './components/user/EditProfile';
import { isAuth } from './actions/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentAuthPage, setCurrentAuthPage] = useState('signin');

  return (
    <div className="app">
        <Navbar loggedIn={ loggedIn } setLoggedIn={ setLoggedIn }/>
        <Switch>
          <Route path="/signup" component={ () => <Signup currentAuthPage={ currentAuthPage } setCurrentAuthPage={ setCurrentAuthPage } setLoggedIn={ setLoggedIn } /> } />
          <Route path="/signin" component={ () => <Signin currentAuthPage={ currentAuthPage } setCurrentAuthPage={ setCurrentAuthPage } setLoggedIn={ setLoggedIn } /> } />
          <Route path="/auth/account/activate/:token" component={ AccountActivation } />
          <Route path="/worldview" component={ () => <GoogleMaps setLoggedIn={ setLoggedIn } /> } />
          <Route path="/profile/edit" component={ () => <EditProfile setLoggedIn={ setLoggedIn } /> } />
        </Switch>
    </div>
  );
}

export default App;
