import React                from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.removeToken();
    history.push('/');
  }

  return(
    <nav>
      { !Auth.isAuthenticated() && <Link to="/login" className="standard-button">Login</Link>}
      {' '}
      { !Auth.isAuthenticated() && <Link to="/register" className="standard-button">Register</Link>}
      {' '}
      { Auth.isAuthenticated() && <a href="#" className="standard-button" onClick={logout}>Logout</a>}
      {' '}
      { Auth.isAuthenticated() && <Link to="/spots" className="standard-button">Spots</Link>}
      {' '}
      { Auth.isAuthenticated() && <Link to="/" className="standard-button">Birds</Link>}

    </nav>
  );
};

export default withRouter(Navbar);
