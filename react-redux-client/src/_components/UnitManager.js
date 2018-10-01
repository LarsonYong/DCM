import React from 'react';
import { connect } from 'react-redux';
import { Keyframes, config } from 'react-spring'
import delay from 'jquery';

import { nodeActions } from '../_actions';
import { userService } from '../_services';
import '../_css/UnitManager.css'
import  NodeList  from './NodeList'

class UnitManager extends React.Component {
    constructor(props){
      super(props);
      this.handleFilterChange = this.handleFilterChange.bind(this);
      this.props.dispatch(nodeActions.getAll());
      this.state = {
        filter1: [
          'All platforms',
          'TK1',
          'XU4',
          'RPI',
          'DELL'
        ],
        filter2: [
          'All',
          '30',
          '40',
          '50',
          '60',
          '70'
        ],
        filter3: [
          'Online/Offline',
          'Online',
          'Offline'
        ],
        currentFilter1: 'All platforms',
        currentFilter2: 'All',
        currentFilter3: 'Online/Offline',
        currentPage: 1,
        listPerPage: 6,
        nodes: [],
        pageNumbers: [],
        nodes: this.props.nodes
      }
      userService.verifyToken1();
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
    }

    componentWillUpdate(){

    }

    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }

    handleFilterChange(event) {
      if (event.target.id === 'platform'){
        this.setState({
          currentFilter1: event.target.value
        })
      }
      if (event.target.id === 'cnntd_gateway'){
        this.setState({
          currentFilter2: event.target.value
        })
      }
      if (event.target.id === 'status'){
        this.setState({
          currentFilter3: event.target.value
        })
      }
    }



    render () {

      const { nodes } = this.props;
      if (nodes.items) {
          var tmpNodes = nodes.items
          if (this.state.currentFilter1 === 'All platforms' && this.state.currentFilter2 == 'All'){
            tmpNodes = nodes.items
          }
          if (this.state.currentFilter1 !== 'All platforms' && this.state.currentFilter2 !== 'All'){
            tmpNodes = tmpNodes.filter(e => e.Hardware.Platform === this.state.currentFilter1).filter(e => e.Software.cnntd_gateway === this.state.currentFilter2)
          }
          if (this.state.currentFilter2 !== 'All' && this.state.currentFilter1 === 'All platforms'){
            tmpNodes = tmpNodes.filter(e => e.Software.cnntd_gateway === this.state.currentFilter2)
          }

          if (this.state.currentFilter2 === 'All' && this.state.currentFilter1 !== 'All platforms'){
            tmpNodes = tmpNodes.filter(e => e.Hardware.Platform === this.state.currentFilter1)
          }

          var filteredList = tmpNodes.slice( (this.state.currentPage * this.state.listPerPage - this.state.listPerPage), this.state.currentPage * this.state.listPerPage)
                                  .map((node, index) => {return <NodeList key={index} node={node}/>})


          var pageNumbers = []
            for (let i = 1; i <= Math.ceil(tmpNodes.length / this.state.listPerPage); i++) {
              pageNumbers.push(i);
            }
          var renderPageNumbers = pageNumbers.map(number => {
            if (number === this.state.currentPage){
              return (
                  <li className="page-item active active-fix" ><a className="page-link" key={number} id={number} onClick={this.handleClick}>{number}</a></li>
              );
            }else {
              return (
                  <li className="page-item" ><a className="page-link" key={number} id={number} onClick={this.handleClick}>{number}</a></li>
              );
            }

          })
      }



      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
                    <div  className="filter">
                      <p>Platfroms</p>
                      <select id="platform"  onChange={this.handleFilterChange} className="form-control ">
                        {this.state.filter1.map((text, index) => {return <option key={index}>{text}</option>})}
                      </select>
                    </div>
                    <div   className="filter">
                      <p>Connected Gateway</p>
                      <select id="cnntd_gateway" onChange={this.handleFilterChange} className="form-control ">
                        {this.state.filter2.map((text, index) => {return <option key={index}>{text}</option>})}
                      </select>
                      </div>
                    <div  className="filter">
                      <p>Status</p>
                      <select id="status"  className="form-control ">
                        {this.state.filter3.map((text, index) => {return <option key={index}>{text}</option>})}
                      </select>
                      </div>
              </div>
            <div className="col-10">
              <div className="content-container marr margT">
                <div id="card-area" className="card-area clearfix">
                  <div className=''>
                    <div className="card-header header-fix">
                      <h4 className="list-title-fix">Unit List</h4>
                      <div className="row title">
                        <p className="col title-fix sm-marg-left">ID</p>
                        <p className="col title-fix">Platfrom</p>
                        <p className="col title-fix">Status</p>
                        <p className="col title-fix">IP address</p>
                        <p className="col title-fix">Connected Gateway</p>
                        <p className="col title-fix text-fix">Analyze</p>
                      </div>
                    </div>
                  </div>
                  {filteredList}

                  {pageNumbers !== [] &&
                     <div>
                       <nav aria-label="...">
                        <ul className="pagination pagination-sm justify-content-center sm-padding-left">
                          {renderPageNumbers}
                        </ul>
                      </nav>
                     </div>
                  }
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
