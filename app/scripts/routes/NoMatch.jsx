import React, { Fragment } from 'react';

export default class NoMatch extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="app__container">
          <div className="app__matchfound">
            <h1>We still haven't found... what you're looking for.</h1>
            <p>Please contact us directly!</p>
            <div className="app__matchdetails">
              <div>Email: HELLO@AWSOM.INFO</div>
              <div>Phone: (425) 951-9758</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
