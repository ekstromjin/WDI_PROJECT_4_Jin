import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import BackButton from '../utility/BackButton';


// import Auth from '../../lib/Auth';

class SpotsIndex extends React.Component {
  state = {
    spots: []
  }

  componentDidMount() {

    Axios
      .get('/api/spots')
      // {
      //   headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      // })
      .then(res => this.setState({ spots: res.data }, () => console.log('this.state',this.state)))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="page-banner col-md-12">
            <BackButton history={history} />
          </div>
          {this.state.spots && this.state.spots.map(spot => {
            return(
              <div key={spot.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
                <Link to={`/spots/${spot.id}`}>
                  <img src={spot.image} className="img-responsive" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SpotsIndex;
