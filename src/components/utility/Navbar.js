import React                from 'react';
import { Link, withRouter } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu'

import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {


  var state       = { isOpen: false };


  function logout(e) {
    e.preventDefault();

    state = { isOpen: false };

    Auth.removeToken();
    history.push('/');
  }

  function menuToggle(e) {
    state = { isOpen: false };
  }

  return(
    <div>
      <nav className="top-menu">
        { !Auth.isAuthenticated() && <Link to="/login" id="tm-login" className="standard-button">Login</Link>}
        { !Auth.isAuthenticated() && <Link to="/register" id="tm-register" className="standard-button">Register</Link>}
        { Auth.isAuthenticated() && <a href="#" id="tm-logout" className="standard-button" onClick={logout}>Logout</a>}
        { Auth.isAuthenticated() && <Link to="/spots" id="tm-spots" className="standard-button">Spots</Link>}
        { Auth.isAuthenticated() && <Link to="/" id="tm-birds" className="standard-button">Birds</Link>}
        { Auth.isAuthenticated() && <Link to="/users" id="tm-users" className="standard-button">Users</Link>}
      </nav>
      <Menu isOpen={state.isOpen}>
        { !Auth.isAuthenticated() && <li><Link to="/login" id="tm-login" className="standard-button" onClick={menuToggle}>Login</Link></li>}
        { !Auth.isAuthenticated() && <li><Link to="/register" id="tm-register" className="standard-button" onClick={menuToggle}>Register</Link></li>}
        { Auth.isAuthenticated() && <li><a href="#" id="tm-logout" className="standard-button" onClick={logout}>Logout</a></li>}
        { Auth.isAuthenticated() && <li><Link to="/spots" id="tm-spots" className="standard-button" onClick={menuToggle}>Spots</Link></li>}
        { Auth.isAuthenticated() && <li><Link to="/" id="tm-birds" className="standard-button" onClick={menuToggle}>Birds</Link></li>}
        { Auth.isAuthenticated() && <li><Link to="/users" id="tm-users" className="standard-button" onClick={menuToggle}>Users</Link></li>}
      </Menu>     
    </div> 
  );
};

export default withRouter(Navbar);
