import React    from 'react';
import Axios    from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';


class UsersShow extends React.Component {
  state = {
    user: {},
    spots: []
  }

  componentDidMount() {

    if(!Auth.isAuthenticated()) {
      location.href = '/login'
      return true;
    }

    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ user: res.data.user })
        this.setState({ spots: res.data.spots })
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="row user-show">
        <div className="page-banner col-md-12"><h4>{this.state.user.username}'s spots</h4></div>
        {this.state.spots && this.state.spots.map(spot => {
          return(
            <div key={spot.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
              <Link to={`/users/${this.state.user.id}/spots/${spot.id}`}>
                <img src={spot.image} className="img-responsive" />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default UsersShow;
