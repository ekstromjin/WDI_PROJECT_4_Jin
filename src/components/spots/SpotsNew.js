import React from 'react';
import Axios from 'axios';

import Auth      from '../../lib/Auth';
import SpotsForm from './SpotsForm';

class SpotsNew extends React.Component {
  state = {
    spot: {
      bird: '',
      image: '',
      location: {},
      likes: []
    },
    errors: {}
  };

  handleChange = ({ target: { name, value } }) => {
    const spot = Object.assign({}, this.state.spot, { [name]: value });
    this.setState({ spot });
  }

  handleChangeUsername = (e) => {
    const spot = Object.assign({}, this.state.spot, { username: e.target.value });
    this.setState({ spot });
  }

  handleOnLocationChange = (place) => {
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };

    const spot = Object.assign({}, this.state.spot, { location });
    this.setState({ spot }, () => console.log(this.state.spot));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/spots', this.state.spot, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }
  // Axios request posting new spot

  handleImageUpload = result => {
    const spot = Object.assign({}, this.state.spot, { image: result.filesUploaded[0].url});
    const errors = Object.assign({}, this.state.errors, { image: ''});
    this.setState({ spot, errors });
  }

  componentDidMount() {
    if(!Auth.isAuthenticated()) {
      location.href = '/login'
      return true;
    }
    
    Axios
      .get('/api/birds', {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ birds: res.data }))
      .catch(err => console.log(err));

  }

  render() {
    return (
      <SpotsForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleOnLocationChange={this.handleOnLocationChange}
        handleChangeUsername={this.handleChangeUsername}
        birds={this.state.birds}
        spot={this.state.spot}
        handleImageUpload={this.handleImageUpload}
        errors={this.state.errors}

      />
    );
  }
}

export default SpotsNew;
