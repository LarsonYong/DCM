import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import '../_css/App.css';
import { history } from '../_helpers';
import { PrivateRoute } from '../_components';
import '../_css/App.css';
import { Home } from '../Views/home'
import { Login } from '../Views/login'

class App extends React.Component {
  simpleAction = (event) => {
   this.props.simpleAction();
  }
  render() {
    return (

        <Router history={history}>
          <div>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/unitManager" component={Home} />
            <PrivateRoute exact path="/simUsage" component={Home} />
            <PrivateRoute exact path="/gwManager" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
          </div>
        </Router>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})



const mapDispatchToProps = dispatch => ({
})

const connectedApp  = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
