import React    from 'react';
import Axios    from 'axios';
import FontAwesome from 'react-fontawesome';
import inArray  from 'in-array';
import _ from 'lodash';
import Moment from 'react-moment';

import GoogleMap from '../maps/GoogleMaps'
import Auth from '../../lib/Auth';

import CommentList from '../utility/CommentList';
import CommentForm from '../utility/CommentForm';

import BackButton from '../utility/BackButton';

class SpotsShow extends React.Component {
    state = {
      spot: {},
      likes: 0,
      isDuplicated: false,
      comments: [],
      comment: {
        first_name: '',
        last_name: '',
        contents: ''
      },
      user: {},
      backText: ''
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

    handleChangeCommentFirstname = (e) => {
      const comment = Object.assign({}, this.state.comment, { first_name: e.target.value });
      this.setState({ comment });      
    }

    handleChangeCommentLastname = (e) => {
      const comment = Object.assign({}, this.state.comment, { last_name: e.target.value });
      this.setState({ comment });      
    }  
      
    handleChangeCommentContents = (e) => {
      const comment = Object.assign({}, this.state.comment, { contents: e.target.value });
      this.setState({ comment });      
    }        

    handleSubmitCommentForm = (e) => {
      e.preventDefault();

      var parentObj = this
      Axios
        .post(`/api/spots/${this.props.match.params.id}/comments/create`, this.state.comment, {
          headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
        })
        .then(res => {
          var comment = [res.data]
          var comments = []
          comments = [...comment, ...parentObj.state.comments]
          this.setState({ comments : comments})

          comment = {
            first_name: '',
            last_name: '',
            contents: ''
          }
          this.setState({ comment : comment})
        })
        .catch(err => console.log(err));
    }    

    componentDidMount() {

      if(!Auth.isAuthenticated()) {
        location.href = '/login'
        return true;
      }

      Axios
        .get(`/api/spots/${this.props.match.params.id}`)
        .then(res => {
          this.setState({ spot: res.data }, () => console.log(this.state));
          this.setState({ likes : res.data.likes.length})
          this.setState({isDuplicated: false})
        })
        .catch(err => console.log(err));

      Axios
        .get(`/api/spots/${this.props.match.params.id}/comments`)
        .then(res => {
          this.setState({ comments: res.data }, () => console.log(this.state));
        })
        .catch(err => console.log(err));    

      if(typeof this.props.match.params.user_id != "undefined") {
        Axios
          .get(`/api/users/${this.props.match.params.user_id}/info`)
          .then(res => {
            this.setState({ user: res.data }, () => console.log(this.state));
            this.setState({ backText: "Back to " + res.data.username + "'s spots" }, () => console.log(this.state));
          })
          .catch(err => console.log(err));
      }
    }
    render() {
      return (
        <div className="row bird-item">
          { this.state.backText != "" && 
            <div className="page-banner col-md-12">
              <BackButton history={history} txt={this.state.backText} />
            </div>
          }
          <div className="image-tile col-md-6">
            <img src={this.state.spot.image} className="img-responsive rounded shadowed" />
          </div>
          <div className="col-md-6">
            { this.state.spot.bird &&
              <div>
                <h3 className="bird-item-name">{ this.state.spot.bird.name }</h3>
                {/*<h5 className="bird-item-byuser">by {this.state.spot.user.username}</h5>*/}
                <h5 className="bird-item-accessory row m-0 mb-3">
                  <span className="col-md-12 p-0">by {this.state.spot.user.username}</span>
                </h5>
                <h5 className="bird-item-accessory row m-0 mb-3">
                  <span className="col-md-12 p-0 bird-item-date"><FontAwesome name='calendar' /> <Moment format="DD/MM/YYYY">{this.state.spot.created_at}</Moment></span>
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

          <div className="bird-item-comment-wrapper col-md-12">
            <h4 className="mb-4 mt-4">Comments</h4>
            <CommentList 
              comments={this.state.comments}
            />
            <CommentForm 
              comment={this.state.comment}
              handleSubmitCommentForm={this.handleSubmitCommentForm}
              handleChangeCommentFirstname={this.handleChangeCommentFirstname}
              handleChangeCommentLastname={this.handleChangeCommentLastname}
              handleChangeCommentContents={this.handleChangeCommentContents}
            />
          </div>
        </div>
      );
    }
}

export default SpotsShow;
