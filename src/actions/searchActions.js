import {SEARCH_MOVIE, FETCH_MOVIES, FETCH_MOVIE,LOADING, SORT_BY_TITLE,SORT_BY_YEAR,SORT_DES,SORT_ASC, FETCH_TOPDATEDMOVIES, FETCH_GENRE,Pass_Gallery} from './types';
import {APIKey, themoviedbAPIKey} from '../APIKey';
import axios from 'axios';



export const searchMovie=text=>dispatch=>{
dispatch ({
    type: SEARCH_MOVIE,
    payload: text
});
};

// export const fetchTopRatedMovie=text =>dispatch=>{
// axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=${text}`)
// .then(response=>dispatch({
//     type:FETCH_TOPDATEDMOVIES,
//     payload: response.data
// })).catch(err => console.log(err));
// };

export const fetchGenre=()=>dispatch=>{
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${themoviedbAPIKey}&language=en-US`)
    .then(response=>dispatch({
        type: FETCH_GENRE,
        payload: response.data
    })).catch(err=>console.log(err));
};

export const fetchMovies =text =>dispatch=>{
axios.get(`http://www.omdbapi.com/?apikey=${APIKey}&s=${text}`)
.then(response=>dispatch({
    type:FETCH_MOVIES,
    payload: response.data
})).catch(err => console.log(err));
};

export const fetchMovie = id => dispatch =>{
axios
.get(`http://www.omdbapi.com/?apikey=${APIKey}&i=${id}`)
.then(response=>dispatch({
    type:FETCH_MOVIE,
    payload: response.data
})).catch(err => console.log(err));
};

// export const fetchTopRatedMovie=()=>({
// type: FETCH_TOPDATEDMOVIES,
// // payload
// });

export const setLoading =() =>{
    return {
        type: LOADING 
    };
};

export const sortByTitle = payload =>({
    type: SORT_BY_TITLE,
    radio:"Title"
    });
    
    export const sortByYear = payload =>({
        type: SORT_BY_YEAR,
        payload
    });
export const sortAsc=payload=>({
    type: SORT_ASC,
    payload
});

export const sortDes=payload=>({
    type: SORT_DES,
    payload
});
export const passGalleryMovies=()=>({
    type: FETCH_TOPDATEDMOVIES,
    // gallerymovies: arr

})

