import React, {Component} from 'react';
import '../_css/NodeList.css'


export default class NodeList extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
     return (
       <div className=" card-hover">
        <div className='card-body body-fix'>
          <div className="row">
            <p className="col col-fix">
              {this.props.node.UnitID}
            </p>
            <p className="col col-fix ">{this.props.node.Hardware.Platform}</p>
            <p className="col col-fix ">Online</p>
            <p className="col col-fix ">{this.props.node.Software.IP_address}</p>
            <p className="col col-fix ">30</p>
            <div className="col col-fix">
              <button className="btn btn-sm btn-outline-success ">Start</button>
              <button className="btn btn-sm btn-outline-info btn-fix ">Result</button>

            </div>
          </div>
        </div>
        </div>
     )
  }
}
