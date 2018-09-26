import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import logo from '../logo.svg';
import '../_css/App.css';
import { history } from '../_helpers';
import { PrivateRoute } from '../_components';
import { simpleAction } from '../actions/SimpleAction'
import '../_css/App.css';
import { Home } from '../Views/home'
import { Login } from '../Views/login'

class App extends React.Component {
  simpleAction = (event) => {
   this.props.simpleAction();
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
              <h2>THis is from App</h2>
          </div>
        </div>
        <Router history={history}>
          <div>
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})



const mapDispatchToProps = dispatch => ({
 simpleAction: () => dispatch(simpleAction())
})

const connectedApp  = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
