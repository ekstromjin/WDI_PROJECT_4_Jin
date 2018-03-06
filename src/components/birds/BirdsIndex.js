import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import inArray  from 'in-array';

import Auth from '../../lib/Auth';

const ASYNC_DELAY = 500;

class BirdsIndex extends React.Component {
  state = {
    birds: [],
    orgBirds: [],
    multi: true,
    multiValue: [],
    colors: [],
    showFilterColor: false,
    searchText: ''
  }

  handleChangeSearch = (e) => {
    var q = e.target.value.replace(/\s/g, "");
    this.state.searchText = q;
    this.methodFilterbyColor()
    this.methodFilterbyName()
  }

  handleClickFilterByColor = (e) => {
    e.preventDefault();
    var target = e.target.tagName.toLowerCase();
    if(target == 'a') {
        this.setState({ showFilterColor: !this.state.showFilterColor })
    }
  }

  handleOnChangeFilter = (value) => {
    this.state.multiValue = value
    this.methodFilterbyColor()
    this.methodFilterbyName()
  }

  methodFilterbyColor = () => {
    const selectColors = [];
    this.state.multiValue.map(function(item) {
      selectColors.push(item.value);
    });

    var parentObj = this
    var birdsByColor = this.state.orgBirds.filter(i => {
      var isTrue = false;
      if(parentObj.state.multiValue.length == 0) {
          isTrue = true;
      } else {
        i.color.map(function(item) {
          if(inArray(selectColors, item)) {
            isTrue = true;
          }
        });
      }

      return isTrue;
    });
    this.state.birds = birdsByColor;
  }

  methodFilterbyName = () => {
    var birdsByName = this.state.birds;
    var parentObj = this
    birdsByName = birdsByName.filter(function(item){
      return item.name.toLowerCase().search(parentObj.state.searchText.toLowerCase()) !== -1;
    });
    this.setState({birds: birdsByName});
  }

  getBirds = (input) => {
    return Axios
      .get('/api/birds', {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => {
        this.setState({ birds: res.data })
        this.setState({ orgBirds: res.data })
        var options = [];
        var colors = [];
        res.data.map(function(bird){
          options = [...options, ...bird.color]
        });
        options = options.filter((val,id,array) => array.indexOf(val) == id).sort();

        options.map(function(color) {
          colors.push({
            color: color,
            value: color
          })
        });

        return { options: colors };
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {

  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <div>
        <div className="row page-banner">
          <div className="col-md-8">
            <Link className="main-button filter-link" to="#" onClick={this.handleClickFilterByColor}>Filter by color
              <div className={"filter-wrapper " + (this.state.showFilterColor ? 'show' : 'hide' )}>
                <Select.AsyncCreatable
                  multi={this.state.multi}
                  loadOptions={this.getBirds}
                  value={this.state.multiValue}
                  onChange={this.handleOnChangeFilter}
                  placeholder=""
                  valueKey="value" 
                  labelKey="color"
                />
              </div>
            </Link>

            { Auth.isAuthenticated() && <Link to="/spots/new" className="main-button"> <i className="fa fa-plus"  aria-hidden="true"></i> Add a spot
            </Link>}
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" value={this.state.searchText} onChange={this.handleChangeSearch} placeholder="Search by name" />
          </div>
        </div>

        <div className="row bird-list mt-2">
          {this.state.birds && this.state.birds.map(bird => {
            return(
              <div key={bird.id} className="col-md-3 col-sm-6 col-xs-12 bird-list-item">
                <Link 
                  to={`/birds/${bird.id}`}
                  className="rounded shadowed"
                  style={{backgroundImage: 'url(' + bird.image + ')'}}>
                </Link>
                <Link to={`/birds/${bird.id}`}>{bird.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BirdsIndex;
