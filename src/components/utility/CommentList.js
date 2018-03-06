import React from 'react';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';

function CommentsList({ comments }) {

  return (
    <div className="row p-0 m-0">
    {comments && comments.map(comment => {
      return(
      <div key={comment.id} className="bird-comment mb-4 col-md-12">
        <div className="card-body">
          <h5 className="card-title">{comment.first_name} {comment.last_name}</h5>
          <p className="card-text">
          {comment.contents.split('\n').map((item, key) => {
            return <span key={key}>{item}<br/></span>
          })}
          </p>
          <p className="card-text">
            <small className="text-muted">
              <FontAwesome name='calendar' /> <Moment format="DD/MM/YYYY HH:mm">{comment.created_at}</Moment>
            </small>
          </p>
        </div>
      </div>
      );
    })}
    </div>
  );
}

export default CommentsList;
