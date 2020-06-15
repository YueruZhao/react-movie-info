import React, { Component } from 'react'
import {searchMovie,fetchMovies, setLoading, sortByTitle, sortByYear,sortAsc,sortDes,fetchTopRatedMovie, fetchGenre} from '../../actions/searchActions';
import {connect} from 'react-redux';
import { Dropdown, DropdownButton } from "react-bootstrap";
import {Link} from 'react-router-dom';


export class SearchForm extends Component {

    //event
    onChange = e=>{
        this.props.searchMovie(e.target.value);
    };

    onSubmit=e=>{
        e.preventDefault();
        this.props.fetchMovies(this.props.text);
        this.props.setLoading();
    };

    handleSortTitle=() =>{
      this.props.sortByTitle();

    }
    handleSortYear=()=>{
      this.props.sortByYear();
    }

    radioHandlerAsc=()=>{
      this.props.sortAsc();
    }

    radioHandlerDes=()=>{
      this.props.sortDes();
    }

    
    render() {
        return (
           
            <div className="jumbotron jumbotron-fluid mt-5 text-center">
        <div className="container">
          <h1 className="display-4 mb-3">
            <i className="fa fa-search" /> Search for movies
          </h1>
          <form id="searchForm" onSubmit={this.onSubmit}>
            <input
              type="text"
              className="form-control"
              name="searchText"
              placeholder="Search Movies..."
              onChange={this.onChange}
            />
            <button style={{margin:'5px'}} type="submit" className="btn btn-primary btn-bg mt-3">
              Search
            </button>
            <Link to="/Gallery" style={{margin:'5px'}} exact className="btn btn-primary btn-bg mt-3">
                      Gallery
                    </Link>
                   
            <DropdownButton onClick={this.handleSortTitle.bind(this)} id="dropdown-basic-button" title="Sort by" style={{marginBottom:'80px'}}>
            <Dropdown.Item                    >Title</Dropdown.Item>
            <Dropdown.Item onClick={this.handleSortYear.bind(this)}> Release Year</Dropdown.Item>
            </DropdownButton>
            <input name='asc' type="radio" style={{margin:'5px'}} value="asc" onChange={this.radioHandlerAsc.bind(this)} defaultChecked />
            Ascending
            <input name='asc' type="radio" style={{margin:'5px'}} value="des" onChange={this.radioHandlerDes.bind(this) } />
            Descending
          </form>
        </div>
      </div>
        );
    }
}

const mapStateToProps=state =>({
        //global state object contains all states in application
        text: state.movies.text,
        search:state.movies.search,
    })


export default connect(mapStateToProps,{searchMovie,fetchMovies, setLoading,sortByTitle,sortByYear,sortAsc,sortDes, fetchGenre})(SearchForm);
