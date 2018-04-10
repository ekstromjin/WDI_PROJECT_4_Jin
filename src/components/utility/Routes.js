import React             from 'react';
import { Route, Switch } from 'react-router-dom';

import Login    from '../auth/Login';
import Register from '../auth/Register';

import BirdsIndex from '../birds/BirdsIndex';
import BirdsShow  from  '../birds/BirdsShow';
import SpotsNew  from  '../spots/SpotsNew';
import SpotsIndex  from  '../spots/SpotsIndex';
import SpotsShow  from  '../spots/SpotsShow';
import UsersIndex  from  '../users/UsersIndex';
import UsersShow  from  '../users/UsersShow';


// import SpotsShow  from  '../birds/SpotsShow';

// import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/" component={BirdsIndex} />
      <Route path="/birds/:id" component={BirdsShow} />
      <Route exact path="/spots" component={SpotsIndex} />
      <Route exact path="/spots/new" component={SpotsNew} />
      <Route path="/spots/:id" component={SpotsShow} />
      <Route exact path="/users" component={UsersIndex} />
      <Route path="/users/:user_id/spots/:id" component={SpotsShow} />
      <Route path="/users/:id" component={UsersShow} />
    </Switch>
  );
};

export default Routes;
