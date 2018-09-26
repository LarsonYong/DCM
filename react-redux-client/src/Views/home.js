import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import {IndexRoute, browserHistory} from 'react-router'
import { connect } from 'react-redux';
import { userService } from '../_services';
import { userActions } from '../_actions';

import  TopBar  from '../_components/TopBar';
import { Login } from '../Views/login'
import { history } from '../_helpers';


// var TopBar = require('../_components/TopBar');

class Home extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
      userService.verifyToken1();
      // this.props.dispatch(userActions.getAll());
    }

  render() {
    const { user, users } = this.props;
    return (
        <Router history={browserHistory}>
            <div id="Home">
              <TopBar name={user}/>
              <Switch>

                <Route path="/login" render={function() {
                    // history.push('/login')
                    window.location.href='/login'
               }} />
                <Route path='/*' render={function () {
                  return <div className="container"><p>Not Found</p></div>
                }} />
                <Route render={function () {
                  return <div className="container"><p>Not Found</p></div>
                }} />
              </Switch>
            </div>
          </Router>
    );
  }
}

function mapStateToProps(state) {
   const { users, authentication } = state;
   const { user } = authentication;
   return {
       user,
       users
   };
}

const connectedHomePage = connect(mapStateToProps)(Home);
export { connectedHomePage as Home };
