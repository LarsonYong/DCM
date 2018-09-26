import React,  {Component} from 'react';
// import '../_css/TopBar.css';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";



export default class TopBar extends React.Component {
      constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
          this.state = {
            dropdownOpen: false
          };
      }

      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

      render() {
        return (
          <div id="top-nav">
            <img className="" src={require('../_assets/logo.png')}></img>
            <Nav>
             <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
               <div>Hi
                 <DropdownToggle nav caret>
                   {this.props.name}
                 </DropdownToggle>
               </div>
               <DropdownMenu>
                 <DropdownItem><Link to="/login">Logout</Link></DropdownItem>
               </DropdownMenu>
             </Dropdown>
           </Nav>
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
