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
      console.log(event.target.id)
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

          if (this.state.currentFilter1 === 'All platforms'){
            // var filteredNodes = nodes.items
            var filteredList = nodes.items.slice( (this.state.currentPage * this.state.listPerPage - this.state.listPerPage), this.state.currentPage * this.state.listPerPage)
                .map((node, index) => {return <NodeList key={index} node={node}/>})
            var pageNumbers = []
              for (let i = 1; i <= Math.ceil(nodes.items.length / this.state.listPerPage); i++) {
                pageNumbers.push(i);
              }
            var renderPageNumbers = pageNumbers.map(number => {
              return (
                <li
                  key={number}
                  id={number}
                  onClick={this.handleClick}
                >
                  {number}
                </li>
              );
            });
          }else {
            var filteredNodes = nodes.items.filter(e => e.Hardware.Platform === this.state.currentFilter1)
            var filteredList = filteredNodes
              .slice( (this.state.currentPage * this.state.listPerPage - this.state.listPerPage), this.state.currentPage * this.state.listPerPage)
              .map((node, index) => {return <NodeList key={index} node={node}/>})
            var pageNumbers = []
              for (let i = 1; i <= Math.ceil(filteredNodes.length / this.state.listPerPage); i++) {
                pageNumbers.push(i);
              }
            var renderPageNumbers = pageNumbers.map(number => {
              return (
                <li
                  key={number}
                  id={number}
                  onClick={this.handleClick}
                >
                  {number}
                </li>
              );
            });
          }

          if (this.state.currentFilter2 === 'All'){

          }else {

          }

          if (this.state.currentFilter3 === 'Online/Offline'){

          }else {

          }


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
                      <select id="cnntd_gateway" className="form-control ">
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
                     <div>{renderPageNumbers}</div>
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
