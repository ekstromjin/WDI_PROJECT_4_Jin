import React          from 'react';
import { withRouter } from 'react-router-dom';

const BackButton = ({ history, txt = 'Back' }) => {
  return (
    <div>
      <button onClick={history.goBack} className="standard-button">
        <i className="fa fa-arrow-left" aria-hidden="true"></i>{txt}
      </button>
    </div>
  );
};

export default withRouter(BackButton);
