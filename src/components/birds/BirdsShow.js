import React    from 'react';
import Axios    from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';


class BirdsShow extends React.Component {
  state = {
    bird: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/birds/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ bird: res.data })
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="row bird-item">
        <div className="image-tile col-md-6">
          { Auth.isAuthenticated() && <Link to="/spots/new" className="main-button"> <i className="fa fa-plus"  aria-hidden="true"></i>Add a spot
          </Link>}
          <img src={this.state.bird.image} className="img-responsive rounded shadowed" />
        </div>
        <div className="col-md-6">
          <h3 className="bird-item-name">{this.state.bird.name}</h3>
          <h4 className="bird-item-colors mb-3">
            {this.state.bird.color && this.state.bird.color.map(color => {
              return(
                <span className="badge badge-secondary" key={color}>{color}</span>
              );
            })}
          </h4>
          <p className="bird-item-info">{this.state.bird.info}</p>
        </div>
      </div>
    );
  }
}

export default BirdsShow;
