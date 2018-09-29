import React, {Component} from 'react';
import '../_css/NodeList.css'


export default class NodeList extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
     return (
       <div className="card card-hover">
        <div className='card-body '>
          <div className="row">
            <p className="col col-fix">
              <button className="btn btn-sm btn-link id-fix">{this.props.node.UnitID} ↓</button>
            </p>
            <p className="col col-fix p-fix">{this.props.node.Hardware.Platform}</p>
            <p className="col col-fix p-fix">Online</p>
            <p className="col col-fix p-fix">{this.props.node.Software.IP_address}</p>
            <p className="col col-fix p-fix">10.70.32.30</p>
            <div className="col col-fix p-fix">
              <button className="btn btn-sm btn-outline-info ">Result</button>
              <button className="btn btn-sm btn-outline-success btn-fix">Analyze</button>
            </div>
          </div>
        </div>
        </div>
     )
  }
}
