import React from 'react';

function CommentsForm({ comment, handleSubmitCommentForm, handleChangeCommentFirstname, handleChangeCommentLastname, handleChangeCommentContents }) {

  return (
    <div className="row">

      <form onSubmit={handleSubmitCommentForm} defaultValue={comment} className="col-md-6">
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="fd-commentFirstname">First name</label>
            <input type="text" className="form-control is-valid" value={comment.first_name} id="fd-commentFirstname" onChange={handleChangeCommentFirstname} placeholder="First name" required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="fd-commentLastname">Last name</label>
            <input type="text" className="form-control is-valid" value={comment.last_name} id="fd-commentLastname" onChange={handleChangeCommentLastname} placeholder="Last name" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="fd-commentContents">Comment</label>
            <textarea className="form-control" id="fd-commentContents" value={comment.contents} required rows="5" onChange={handleChangeCommentContents}></textarea>
          </div>
        </div>

        <div>
          <button className="save-button">Save</button>
        </div>

      </form>
    </div>
  );
}

export default CommentsForm;
