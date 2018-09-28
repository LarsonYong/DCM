import React from 'react';
import { connect } from 'react-redux';
import { Keyframes, config } from 'react-spring'
import delay from 'jquery';

import { nodeActions } from '../_actions';
import { userService } from '../_services';
import '../_css/UnitManager.css'

// console.log(this.props)
const Container = Keyframes.Spring({
// Single props
show: { to: { opacity: 1 } },
// Chained animations (arrays)
showAndHide: [ { to: { opacity: 1 } }, { to: { opacity: 0 } }],
// Functions with side-effects
wiggle: async call => {
    await call({ to: { x: 100 }, config: config.wobbly })
    await delay(1000)
    await call({ to: { x: 0 }, config: config.gentle })
  }
})


class UnitManager extends React.Component {
    constructor(props){
      super(props);
      this.checkFilter = this.checkFilter.bind(this)
      this.state = {
        filter: [
          'all_platfrom',
          'all_gateway',
          'all_status'
        ]
      }


    }

    componentDidMount() {
      userService.verifyToken1();
      this.props.dispatch(nodeActions.getAll());
      // this.checkFilter();
    }


    componentWillUpdate(){

    }

    checkFilter(){
      var platforms = document.getElementById("platform");
      var platforms_selected = platforms.options[platforms.selectedIndex].value
      var cnntd_gateways = document.getElementById("cnntd_gateway");
      var cnntd_gateway_selected = cnntd_gateways.options[cnntd_gateways.selectedIndex].value
      var status = document.getElementById("status");
      var status_selected = status.options[status.selectedIndex].value
      console.log(platforms_selected, cnntd_gateway_selected, status_selected)
    }



    render () {
      const { nodes } = this.props;

      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
                    <div  className="filter">
                      <p>Platfroms</p>
                      <select id="platform" class="form-control ">
                        <option selected>All platforms</option>
                        <option> TK1</option>
                        <option> XU4</option>
                        <option> RPI</option>
                        <option> DELL</option>
                      </select>
                    </div>
                    <div   className="filter">
                      <p>Connected Gateway</p>
                      <select id="cnntd_gateway" class="form-control ">
                        <option selected>All</option>
                        <option >30</option>
                        <option> 40</option>
                        <option> 50</option>
                        <option> 60</option>
                        <option> 70</option>
                      </select>
                      </div>
                    <div  className="filter">
                      <p>Status</p>
                      <select id="status"  class="form-control ">
                        <option  selected>Online/Offline</option>
                        <option> Online</option>
                        <option> Offline</option>
                      </select>
                      </div>
              </div>


            <div className="col-10">
              <div className="content-container marr margT">
          <div id="card-area" className="card-area clearfix">
            <table class="table table-hover table-bordered">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Unit ID</th>
                  <th scope="col">Platfrom</th>
                  <th scope="col">Network Status</th>
                  <th scope="col">IP address</th>
                  <th scope="col">Gateway</th>
                  <th scope="col" className="th-fix">Full Infomation</th>
                  <th scope="col" className="th-fix">Actions</th>
                </tr>
              </thead>

          {nodes.loading &&<em>Loading nodes...</em>}
          {nodes.error && <span className="text-danger">ERROR: {nodes.error}</span>}
          {nodes.items && <tbody>{nodes.items.map((node, index) => (
              <tr>
                  <th scope="row">{node.UnitID}</th>
                  <td>{node.Hardware.Platform}</td>
                  <td>Online</td>
                  <td>{node.Software.IP_address}</td>
                  <td>30</td>
                  <td>
                    <button className="btn  btn-sm btn-link btn-fix">More Details</button>
                  </td>
                  <td>

                    <button className="btn  btn-sm btn-outline-success btn-fix">Analyze</button>
                    <button className="btn btn-sm btn-outline-info btn-fix">Result</button>
                  </td>
                </tr>
          ))}</tbody>}

            </table>
          </div>
      </div>
            </div>

          </div>
        </div>
      )
    }
}

function mapStateToProps(state) {
    const { nodes } = state;
      return {
          nodes: state.nodes
      };
}

const connectedUnitManager = connect(mapStateToProps)(UnitManager);
export { connectedUnitManager as UnitManager };
