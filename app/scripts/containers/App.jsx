import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';
import history from 'modules/history';
import RoutePublic from 'modules/RoutePublic';
import RoutePrivate from 'modules/RoutePrivate';

import config from 'config';
import { showAlert } from 'actions';

import Home from 'routes/Home';
import FreeTrial from 'routes/FreeTrial';
import Private from 'routes/Private';
import NotFound from 'routes/NotFound';
import Confirmation from 'routes/Confirmation';
import Match from 'routes/Match';
import NoMatch from 'routes/NoMatch';
import SecondaryForm from 'routes/SecondaryForm';
import OldHome from 'routes/OldHome';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SystemAlerts from 'components/SystemAlerts';

export class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch, user } = this.props;
    const { user: nextUser } = nextProps;

    /* istanbul ignore else */
    if (!user.isAuthenticated && nextUser.isAuthenticated) {
      dispatch(
        showAlert('Hello! And welcome!', { type: 'success', icon: 'i-trophy' })
      );
    }
  }

  render() {
    const { app, dispatch, user } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div
          className={cx('app', {
            'app--private': user.isAuthenticated,
          })}
        >
          <Helmet
            defer={false}
            htmlAttributes={{ lang: 'en-us' }}
            encodeSpecialCharacters={true}
            defaultTitle={config.title}
            titleTemplate={`%s | ${config.name}`}
            titleAttributes={{ itemprop: 'name', lang: 'en-us' }}
          />
          <Header dispatch={dispatch} user={user} />
          <main className="app__main">
            <Switch>
              <RoutePublic
                isAuthenticated={user.isAuthenticated}
                path="/"
                exact
                component={Home}
              />
              <RoutePublic
                isAuthenticated={user.isAuthenticated}
                path="/free-trial"
                exact
                component={FreeTrial}
              />
              <RoutePublic
                isAuthenticated={user.isAuthenticated}
                path="/confirmation"
                exact
                component={Confirmation}
              />
              <RoutePublic
                isAuthenticated={user.isAuthenticated}
                path="/match"
                exact
                component={Match}
              />
              <RoutePublic
                isAuthenticated={user.isAuthenticated}
                path="/no-match"
                exact
                component={NoMatch}
              />
              <RoutePublic
                isAuthenticated={user.isAuthenticated}
                path="/secondary-form"
                exact
                component={SecondaryForm}
              />
              <RoutePublic
                isAuthenticated={user.isAuthenticated}
                path="/old-home"
                component={OldHome}
              />
              <RoutePrivate
                isAuthenticated={user.isAuthenticated}
                path="/private"
                component={Private}
              />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <SystemAlerts alerts={app.alerts} dispatch={dispatch} />
        </div>
      </ConnectedRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
