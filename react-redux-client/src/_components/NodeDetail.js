import React, {Component} from 'react';
import '../_css/NodeDetail.css'


export default class NodeDetail extends React.Component {
  constructor(props){
    super(props);
    const navSoftwareID = '#' + this.props.node.UnitID +'nav-software'
    const navSoftware = this.props.node.UnitID +'nav-software'
    const navSoftwaretab = this.props.node.UnitID +'software-tab'
    const navHardwareID = '#' + this.props.node.UnitID +'nav-hardware'
    const navHardare = this.props.node.UnitID +'nav-hardware'
    const navHardwaretab = this.props.node.UnitID + 'hardware-tab'
    const navTestID = '#' + this.props.node.UnitID +'nav-test'
    const navTest = this.props.node.UnitID +'nav-test'
    const navTesttab =this.props.node.UnitID + 'test-tab'

    this.state = {
      node:this.props.node,
      navSoftware: navSoftware,
      navSoftwareID: navSoftwareID,
      navSoftwaretab: navSoftwaretab,
      navHardare: navHardare,
      navHardwareID: navHardwareID,
      navHardwaretab: navHardwaretab,
      navTest: navTest,
      navTestID: navTestID,
      navTesttab: navTesttab
    }
    this.handleEdit = this.handleEdit.bind(this);

  }

  handleEdit(event){
    // console.log("this is from Clicl event", this.props.node);
    console.log(event.target.id)
    return <h1>THsssss</h1>
  }



  render () {
     var renderSoftware = Object.keys(this.state.node.Software).map( index2 => {
       return <div className="row sm-marg-left" id={this.state.node.Software[index2]} key={index2}><div className="col DetailTitle col-lg-3 " key={index2}>{index2}: </div><div className="DetailContent col ">{this.state.node.Software[index2]}</div></div>
    })

    var renderTest = Object.keys(this.props.node.Test).map( index3 => {
      return <div className="row sm-marg-left" key={index3}><div className="col DetailTitle col-lg-3 " key={index3}>{index3}: </div><div className="DetailContent col ">{this.props.node.Test[index3]}</div></div>
    })
    var renderFooter = Object.keys(this.props.node.UnitID).map( id => {
      return <div className="modal-footer">
        <button type="button" id={id} className="btn btn-outline-primary" onClick={this.handleEdit}>Modify</button>
        <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Close</button>
      </div>
    })
    return (

      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Unit {this.props.node.UnitID}</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <nav>
          <div className="nav nav-tabs sm-marg-left sm-marg-right" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id={this.state.navSoftwaretab} data-toggle="tab" href={this.state.navSoftwareID} role="tab" aria-controls={this.state.navSoftware} aria-selected="true">Software</a>
            <a className="nav-item nav-link" id={this.state.navHardwaretab} data-toggle="tab" href={this.state.navHardwareID} role="tab" aria-controls={this.state.navHardare} aria-selected="false">Hardware</a>
            <a className="nav-item nav-link" id={this.state.navTesttab} data-toggle="tab" href={this.state.navTestID} role="tab" aria-controls={this.state.navTest} aria-selected="false">Test</a>
          </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id={this.state.navSoftware} role="tabpanel" aria-labelledby={this.state.navSoftwaretab}>
            <div className="height-fix"></div>
           {renderSoftware}

          </div>
          <div className="tab-pane fade" id={this.state.navHardare} role="tabpanel" aria-labelledby={this.state.navHardwaretab}>
            <div className="height-fix"></div>
            <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3">Platform: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.Platform}</div>
            </div>
            <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3">4G module: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.FourGModule}</div>
            </div>
            <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3">Sensor Board: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.SensorBoard}</div>
            </div>
            <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3">WiFi Module: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.WIFIModule}</div>
            </div>
            <div className="  bdr-top">
              <div className="row">
              <div className="card-header sm-fix ">Camera</div>
              </div>
              <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3"> manufacturer: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.Camera.manufacturer}</div>
              </div>
            </div>
            <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3"> Type: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.Camera.Type}</div>
            </div>
            <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3"> Lens: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.Camera.lens}</div>
            </div>


            <div className="bdr-top">
              <div className="row">
                <div className="card-header sm-fix">SSD</div>
              </div>
              <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3"> manufacturer: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.SSD.manufacturer}</div>
            </div>
            </div>
            <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3"> Type: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.SSD.Type}</div>
            </div>
            <div className="row sm-marg-left">
              <div className="col DetailTitle col-lg-3"> capacity: </div>
              <div className="DetailContent col ">{this.props.node.Hardware.SSD.Capacity}</div>
            </div>
          </div>
          <div className="tab-pane fade" id={this.state.navTest} role="tabpanel" aria-labelledby={this.state.navTesttab}>
            <div className="height-fix"></div>
            {renderTest}
          </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" id={this.props.node.UnitID} className="btn btn-outline-primary" onClick={this.handleEdit}>Modify</button>
          <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Close</button>

        </div>
      </div>
    )
  }

}
