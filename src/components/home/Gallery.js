import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {themoviedbAPIKey} from '../../APIKey';
import axios from 'axios';


function MovieGrid(props){
    return (
<ul className='popular-list-gallery' style={{display:'flex',flexWrap:'wrap',justifyContent:'center',paddingTop:'25px'}}>
			{props.gallerymovies.map( function(movie, index) {
                let moviePoster;
                
				if(props.selectedGenre ==999999999 ) { 
                    moviePoster =(
                        <div className="card card-body bg-dark text-center h-70" style={{marginLeft:'5px',marginBottom:'5px', marginRight:'5px',marginTop:'5px'}}>
                        <img style={{height: "300px",width: "241.66px",paddingBottom: "25px",paddingRight: "12.5px",paddingLeft: "12.5px",justifyContent:'center'}} src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path}/>
                        <Link className="text-light card-title" 
                              to={'/detail/'+movie.id} >
                              {movie.title}
                        </Link>
                        </div>
                    );

                    
				}
				for(var i = 0; i < movie.genre_ids.length; i++) {
					if(movie.genre_ids[i] == props.selectedGenre) {
						if(movie.poster_path != null)
							moviePoster = (
                            <div  className="card card-body bg-dark text-center h-70" style={{marginLeft:'5px',marginBottom:'5px', marginRight:'5px',marginTop:'5px'}}>
                                <img  style={{height: "300px",width: "241.66px",paddingBottom: "25px",paddingRight: "12.5px",paddingLeft: "12.5px", justifyContent:'center'}} src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} />
                           <Link className="text-light card-title" to={'/detail/'+movie.id}>{movie.title}</Link> </div>);
						   break;
					}
				}
				return (
					<div key={movie.id} >
						{moviePoster}
					</div>
				)
			})}
		</ul>
    )
}


export class Gallery extends Component {
    
constructor(){
    super();
    this.state= {
        genres:[],
        gallerymovies:[],
        selectedGenre: 999999999
    };
    this.clickHandler=this.clickHandler.bind(this);
}

clickHandler(id){
    this.setState({
        selectedGenre:id,
    })
}

 componentDidMount(){
     this.updateMovies(this.selectedGenre);
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${themoviedbAPIKey}&language=en-US`)
    .then(response=>{
        this.setState({genres: response.data.genres})
    }).catch(err=>{
         console.log(err)
     });

    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=1`)
    .then(response=>{
        this.setState({gallerymovies: response.data.results})
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=2`)
    }).then(response=>{
        this.setState({gallerymovies: this.state.gallerymovies.concat(response.data.results)})
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=2`)
    })
    .then(response=>{
        this.setState({gallerymovies: this.state.gallerymovies.concat(response.data.results)})
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=3`)
     })
     .then(response=>{
        this.setState({gallerymovies: this.state.gallerymovies.concat(response.data.results)})
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=4`)
     })
     .then(response=>{
        this.setState({gallerymovies: this.state.gallerymovies.concat(response.data.results)})
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=5`)
     })
     .then(response=>{
        this.setState({gallerymovies: this.state.gallerymovies.concat(response.data.results)})
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=6`)
     })
     .then(response=>{
        this.setState({gallerymovies: this.state.gallerymovies.concat(response.data.results)})
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=7`)
     })
     .then(response=>{
        this.setState({gallerymovies: this.state.gallerymovies.concat(response.data.results)})
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=8`)
     })
     .catch(err=>{
         console.log(err)
     })
}
    updateMovies(genre_id){
        this.setState(function(){
            return {
                selectedGenre: genre_id
            }
        })
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid mt-5 text-center">
            <div className="container">
            <h1 className="display-4 mb-3">Top Rated Movies</h1>
            <Link to="/" style={{margin:'5px'}} exact className="btn btn-primary btn-bg mt-3">
                      Search
            </Link>


             <div>
            <button onClick={()=>this.clickHandler(999999999)}style={{margin:'3px'}} exact className="btn btn-secondary btn-bg mt-3">All</button>
            {this.state.genres.map((item)=>
            <button value={item.id}  onClick={()=>this.clickHandler(item.id)} style={{margin:'3px'}} exact className="btn btn-secondary btn-bg mt-3">{item.name}</button>)}
             </div>
                    {!this.state.gallerymovies
					? <p>LOADING</p>
					: <MovieGrid gallerymovies={this.state.gallerymovies} selectedGenre={this.state.selectedGenre} />
				} 
        </div>
      </div>
        );
    }
}

export default Gallery;
