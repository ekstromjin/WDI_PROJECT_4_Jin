import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import inArray  from 'in-array';

import Auth from '../../lib/Auth';

const ASYNC_DELAY = 500;

class UsersIndex extends React.Component {
  state = {
    users: [],
    orgUsers: [],
    searchText: ''
  }

  handleChangeSearch = (e) => {
    var q = e.target.value.replace(/\s/g, "");
    this.state.searchText = q;
    this.methodFilterbyName()
  }

  methodFilterbyName = () => {
    var usersByName = this.state.orgUsers;
    var parentObj = this
    usersByName = usersByName.filter(function(item){
      return item.username.toLowerCase().search(parentObj.state.searchText.toLowerCase()) !== -1;
    });
    this.setState({users: usersByName});
  }

  componentDidMount() {
    if(!Auth.isAuthenticated()) {
      location.href = '/login'
      return true;
    }

    Axios
      .get('/api/users', {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => {
        console.log(res.data)
        this.setState({ users: res.data })
        this.setState({ orgUsers: res.data })
      })
      .catch(err => console.log(err));
  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <div>
        <div className="row page-banner mb-4">
          <div className="col-md-6">

          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" value={this.state.searchText} onChange={this.handleChangeSearch} placeholder="Search by name" />
          </div>
        </div>

        <div className="row bird-list user-list mt-2">
          {this.state.users && this.state.users.map(user => {
            return(
              <div key={user.id} className="col-md-2 col-sm-4 col-xs-12 bird-list-item">
                <Link 
                  to={`/users/${user.id}`}
                  className="rounded shadowed"
                  style={{backgroundImage: 'url(' + user.photo + ')'}}>
                </Link>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UsersIndex;
