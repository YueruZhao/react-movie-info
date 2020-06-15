import React, { Component } from 'react'
import SearchForm from './SearchForm';
import MovieContainer from './MovieContainer';
import {connect} from 'react-redux'; 
import Spinner from '../layout/Spinner';


export class Landing extends Component {
    render() {
        const {loading}=this.props;
        return (
            <div className='container'>
                <SearchForm />
                {loading
                ?<Spinner />
                : <MovieContainer />}
            </div>
        );
    }
}
const mapStateToProps = state =>({
    loading: state.movies.loading
});

export default connect (mapStateToProps)(Landing);
