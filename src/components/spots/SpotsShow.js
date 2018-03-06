import React    from 'react';
import Axios    from 'axios';
import FontAwesome from 'react-fontawesome';
import inArray  from 'in-array';
import _ from 'lodash';
import Moment from 'react-moment';

import GoogleMap from '../maps/GoogleMaps'
import Auth from '../../lib/Auth';

class SpotsShow extends React.Component {
    state = {
      spot: {},
      likes: 0,
      isDuplicated: false
    }

    handleClickLikes = (e) => {
      e.preventDefault();

      var already_liked = _.filter(this.state.spot.likes, { 'user_id': Auth.getToken() });
      if(already_liked.length) {
        this.setState({isDuplicated: true})
      } else {
        this.state.spot.likes.push({ 'user_id': Auth.getToken() })
      

        var sendData = {
          id: this.props.match.params.id,
          likes: this.state.spot.likes
        };

        var parentObj = this
        Axios
          .post(`/api/spots/${this.props.match.params.id}`, this.state.spot, {
            headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
          })
          .then(res => {
            this.setState({ likes : parentObj.state.spot.likes.length})
          })
          .catch(err => console.log(err));
      }
    }

    componentDidMount() {
      console.log(this.props.match.params.id);
      Axios
        .get(`/api/spots/${this.props.match.params.id}`)
        .then(res => {
          this.setState({ spot: res.data }, () => console.log(this.state));
          this.setState({ likes : res.data.likes.length})
          this.setState({isDuplicated: false})
        })
        .catch(err => console.log(err));
    }
    render() {
      return (
        <div className="row bird-item">
          <div className="image-tile col-md-6">
            <img src={this.state.spot.image} className="img-responsive rounded shadowed" />
          </div>
          <div className="col-md-6">
            { this.state.spot.bird &&
              <div>
                <h3 className="bird-item-name">{ this.state.spot.bird.name }</h3>
                {/*<h5 className="bird-item-byuser">by {this.state.spot.user.username}</h5>*/}
                <h5 className="bird-item-accessory row m-0 mb-3">
                  <span className="col-md-6 p-0">by {this.state.spot.username}</span>
                  <span className="col-md-6 p-0 bird-item-date"><FontAwesome name='calendar' /> <Moment format="DD/MM/YYYY">{this.state.spot.created_at}</Moment></span>
                </h5>
                <div className="bird-item-location">
                  <p>Latitude: { this.state.spot.location.lat }</p>
                  <p>Longitude: { this.state.spot.location.lng }</p>
                </div>
                {  Auth.isAuthenticated() &&
                <p>
                  <button className="main-button" onClick={this.handleClickLikes}> <FontAwesome name='thumbs-up' /> Like {this.state.likes == 0? '': this.state.likes}</button>
                  <span className={"notify-error alert alert-warning alert-dismissible fade " + (this.state.isDuplicated ? 'show' : 'hide' )} role="alert">You already liked it.</span>
                </p>
                }
                <GoogleMap lat={this.state.spot.location.lat} lng={this.state.spot.location.lng} />
              </div>
            }
            {/* <h3>{this.state.spot.name}</h3>
            <h4>{this.state.spot.location.lat}</h4> */}
          </div>
        </div>
      );
    }
}

export default SpotsShow;
