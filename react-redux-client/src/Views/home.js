import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { browserHistory} from 'react-router'
import { connect } from 'react-redux';
import { userService } from '../_services';
import { userActions } from '../_actions';

import  TopBar  from '../_components/TopBar';
import { UnitManager } from '../_components/UnitManager';



import '../_css/bootstrap.min.css';
// var TopBar = require('../_components/TopBar');

class Home extends React.Component {
    constructor(props){
      super(props);
    }
    componentDidMount() {
        userService.verifyToken1();
        this.props.dispatch(userActions.getAll());
      }

    render() {
      const { user, users } = this.props;
      return (
          <Router history={browserHistory}>
              <div id="Home">
                <TopBar name={user}/>
                <Switch>
                  <Route exact path='/home' render={function () {
                      return <div className="container-fluid" ><h3 className="marg-top">This is Home page</h3></div>
                    }} />
                  <Route exact path='/unitManager' render={function () {
                      return <UnitManager />
                    }} />
                  <Route exact path='/simUsage' render={function () {
                      return <div className="container-fluid" ><h3 className="marg-top">This is sim usage page</h3></div>
                    }} />
                  <Route exact path='/gwManager' render={function () {
                      return <div className="container-fluid"><h3 className="marg-top">This is gateway manager</h3></div>
                    }} />
                  <Route path="/login" render={function() {
                      // history.push('/login')
                      window.location.href='/login'
                 }} />
                  <Route path='/*' render={function () {
                    return <div className="container-fluid"><p>Not Found 1</p></div>
                  }} />
                  <Route render={function () {
                    return <div className="container-fluid"><p>Not Found 2</p></div>
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
