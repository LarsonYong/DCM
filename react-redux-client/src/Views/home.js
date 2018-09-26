import React from "react";
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    return (
      <div id="home">
        <h1>This is the Home page.</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {

    };
}

const connectedHomePage = connect(mapStateToProps)(Home);
export { connectedHomePage as Home };
