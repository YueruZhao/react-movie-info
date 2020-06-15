import React, { Component } from 'react'
import axios from 'axios';
import { themoviedbAPIKey } from '../../APIKey';


function DisplayMovie(props) {
  return (
    <div className="container">
      {
        props.gallerymovies.map(function (movie) {
          if (props.currentMovieId == movie.id) {
            return (
              <div className="row">
                <div className="col-md-4 card card-body">
                  <img style={{ height: "300px", width: "241.66px", paddingBottom: "25px", paddingRight: "12.5px", paddingLeft: "12.5px", justifyContent: 'center' }} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
                </div>
                <div className="col-md-8">
                  <h2 className="mb-4">{movie.title}</h2>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Release Date:</strong> {movie.release_date}
                    </li>
                    <li className="list-group-item">
                      <strong>Popularity:</strong> {movie.popularity}
                    </li>
                    <li className="list-group-item">
                      <strong>Overview:</strong> {movie.overview}
                    </li>
                  </ul>
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
}

class Detail extends Component {
  constructor() {
    super()
    this.state = {
      gallerymovies: [],
      currentMovieId: ''
    }
    this.previousClickHandler = this.previousClickHandler.bind(this);
    this.nextClickHandler = this.nextClickHandler.bind(this);
  };

  previousClickHandler = () => {
    let counter = 0;
    while (this.state.gallerymovies[counter].id != this.state.currentMovieId) {
      counter++;
    }
    if (counter == 0) {
      this.props.history.push("/detail/" + this.state.gallerymovies[159].id); // JUST CHANGE THE DISPLAY MOVIE INSTEAD OF ROUTE, WELL OR BOTH REALLY
      this.setState({ currentMovieId: this.state.gallerymovies[159].id });
    }
    else {
      this.props.history.push("/detail/" + this.state.gallerymovies[counter - 1].id);
      this.setState({ currentMovieId: this.state.gallerymovies[counter - 1].id });
    }
  }
  nextClickHandler = () => {
    let counter = 0;
    while (this.state.gallerymovies[counter].id != this.state.currentMovieId) {
      counter++;
    }
    if (counter == 119) {
      this.props.history.push("/detail/" + this.state.gallerymovies[0].id);
      this.setState({ currentMovieId: this.state.gallerymovies[0].id });
    }
    else {
      this.props.history.push("/detail/" + this.state.gallerymovies[counter + 1].id);
      this.setState({ currentMovieId: this.state.gallerymovies[counter + 1].id });
    }
  }


  componentDidMount() {
    const value = this.props.match.params.id;
    this.setState({
      currentMovieId: value
    })

    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${themoviedbAPIKey}&language=en-US`)
      .then(response => {
        this.setState({ genres: response.data.genres })
      }).catch(err => {
        console.log(err)
      });

    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=1`)
      .then(response => {
        this.setState({ gallerymovies: response.data.results })
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=2`)
      }).then(response => {
        this.setState({ gallerymovies: this.state.gallerymovies.concat(response.data.results) })
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=2`)
      })
      .then(response => {
        this.setState({ gallerymovies: this.state.gallerymovies.concat(response.data.results) })
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=3`)
      })
      .then(response => {
        this.setState({ gallerymovies: this.state.gallerymovies.concat(response.data.results) })
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=4`)
      })
      .then(response => {
        this.setState({ gallerymovies: this.state.gallerymovies.concat(response.data.results) })
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=5`)
      })
      .then(response => {
        this.setState({ gallerymovies: this.state.gallerymovies.concat(response.data.results) })
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=6`)
      })
      .then(response => {
        this.setState({ gallerymovies: this.state.gallerymovies.concat(response.data.results) })
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=7`)
      })
      .then(response => {
        this.setState({ gallerymovies: this.state.gallerymovies.concat(response.data.results) })
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=8`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid mt-2 text-center">
          <button style={{ margin: '5px', top: '0', right: '0', marginRight: '45px' }} type="submit" className="btn btn-primary btn-bg mt-3" onClick={this.previousClickHandler.bind(this)}>
            Previous
            </button>
          <button style={{ margin: '5px', top: '10px', right: '10px', button: '10px', marginLeft: '45px' }} type="submit" className="btn btn-primary btn-bg mt-3" onClick={this.nextClickHandler.bind(this)}>
            Next
            </button>
        </div>
        <DisplayMovie gallerymovies={this.state.gallerymovies} currentMovieId={this.state.currentMovieId} />
      </div>
    )
  }
}
export default Detail;
