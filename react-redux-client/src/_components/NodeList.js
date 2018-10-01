import React, {Component} from 'react';
import '../_css/NodeList.css'
import NodeDetail from './NodeDetail'

export default class NodeList extends React.Component {
  constructor(props){
    super(props);

    const dataToggle = this.props.node.UnitID.concat('modal');
    const dataTarget = '#' + this.props.node.UnitID.concat('modal')
    this.state ={
      dataToggle: dataToggle,
      dataTarget: dataTarget
    }
  }


  render() {
     return (
       <div className=" card-hover">
        <div className='card-body body-fix'>
          <div className="row">
            <p className="col col-fix">
              <button className="btn btn-sm btn-link" data-toggle="modal" data-target={this.state.dataTarget}>{this.props.node.UnitID}</button>
            </p>
            <div className="modal fade" id={this.state.dataToggle} tabIndex="-1" role="dialog" aria-labelledby="{this.props.node.UnitID}ModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg " role="document">
                <NodeDetail node = {this.props.node}/>
              </div>
            </div>

            <p className="col col-fix ">{this.props.node.Hardware.Platform}</p>
            <p className="col col-fix ">Online</p>
            <p className="col col-fix ">{this.props.node.Software.IP_address}</p>
            <p className="col col-fix ">{this.props.node.Software.cnntd_gateway}</p>
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
