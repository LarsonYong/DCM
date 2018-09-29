import React from 'react';
import { Link } from 'react-router-dom';
import {
  Route,
  Redirect,
  NavLink,

} from "react-router-dom";

import '../_css/TopBar.css';

export default class TopBar extends React.Component {
      constructor(props){
        super(props);
        var currentPost = 'Home'
        if (window.location.pathname === '/unitManager'){
          currentPost = 'Unit Manager'
        }
        if (window.location.pathname === '/simUsage'){
          currentPost = 'Sim Usage'
        }
        if (window.location.pathname === '/gwManager'){
          currentPost = 'Gateway Manager'
        }
        this.state = {
            currentState: currentPost
          };
      }


      componentWillUpdate(currentPost) {
        if (window.location.pathname === '/unitManager' && this.state.currentState !== 'Unit Manager'){
          this.setState({
            currentState: 'Unit Manager'
          })
        }
        if (window.location.pathname === '/simUsage' && this.state.currentState !== 'Sim Usage'){
          this.setState({
            currentState: 'Sim Usage'
          })
        }
        if (window.location.pathname === '/gwManager' && this.state.currentState !== 'Gateway Manager'){
          this.setState({
            currentState: 'Gateway Manager'
          })
        }
      }
      render() {
        return (
          <div id="top">
            <div className="container-fluid">
              <div className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
                <a className="navbar-brand mr-0 mr-md-2" href='/home'>
                  <img className="top-logo" alt="Logo" src={require('../_assets/v5-icon.png')}></img>
                </a>
              <div className="navbar-nav-scroll">
                <ul className="navbar-nav bd-navbar-nav flex-row">
                  <NavLink to='/unitManager'><li ref='unitManager' className="nav-item nav-fix active ">Unit Manager</li></NavLink>
                  <NavLink to='/simUsage'><li ref='simUsage' className="nav-item nav-fix ">Sim Usage</li></NavLink>
                  <NavLink to='/gwManager'><li ref='gwManager' className="nav-item nav-fix ">Gateway Manager</li></NavLink>
                </ul>
              </div>
                <div className="dropdown ml-md-auto">
                  <button className="btn btn-trans dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.name}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Admin</a>
                    <a className="dropdown-item" href="#">Setting</a>
                    <div className="dropdown-item" href="#"><Link to="/login">Logout</Link></div>
                  </div>
                </div>
              </div>
              <div className="location-indicator">
                <h3>{this.state.currentState}</h3>
              </div>
              <div className="sec-nav">
                <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link nav-active" href="#">Units List</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Modify</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Check</a>
                </li>
              </ul>
              </div>
            </div>
            <Route path='/login' render={function () {
              return <Redirect
                    to={{
                      pathname: "/login"
                    }}
                  />
            }} />

            </div>
        )
      }
}

// export TopBar
// module.exports = TopBar;
