import {SEARCH_MOVIE,FETCH_MOVIES, FETCH_MOVIE, LOADING,SORT_BY_YEAR,SORT_BY_TITLE,SORT_ASC,SORT_DES,FETCH_TOPDATEDMOVIES,FETCH_GENRE,Pass_Gallery} from '../actions/types';
import {themoviedbAPIKey} from '../APIKey';
import axios from 'axios';

  const initialState={
     text:'',
     movies:[],
     loading: false,
     movie:[],
     sortby:'',
     radio:'',
     search:'',

 }

 function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return 1;

        if (b[field]> a[field]) return -1;

        return 0;
    })
}

function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return -1;

        if (b[field]> a[field]) return 1;

        return 0;
    })
}
 export default function(state=initialState,action){
     switch(action.type){
        case SORT_ASC:
            const sortByAcs = Object.assign({}, state);
            let sortedAcs = state.movies.sortby === "title" ?
                sortDesc(state.movies.Search, 'Title') :
                sortDesc(state.movies.Search, 'Year');
                sortedAcs.movies=sortedAcs
            return {
                 ...state,
                 radio: 'asc',
                 Search:sortByAcs

             }
        case SORT_DES:
            const sortByDes = Object.assign({}, state);
            let sortedDesArr = state.movies.sortby === "title" ?
                sortAsc(state.movies.Search, 'Title') :
                sortAsc(state.movies.Search, 'Year');
                sortedDesArr.movies=sortByDes
            return {
                 ...state,
                 radio: 'des',
                 Search:sortByDes

             }

         case SEARCH_MOVIE:
             return {
                 ...state,
                 text: action.payload,
                 loading: false,
                 search: action.payload
             }


             case FETCH_MOVIES:
                return {
                    ...state,
                    movies:action.payload,
                    loading: false
                };

            case FETCH_GENRE:
                return {
                    ...state,
                    genres: action.payload
                }

            case FETCH_TOPDATEDMOVIES:
                console.log('666666666');

                var arr=[]
                const gallerymovies_arr = Object.assign({}, state);

                axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=1`)
.then(response=>{
    arr=arr.concat(response.data.results)
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=2`)
}).then(response=>{
    arr=arr.concat(response.data.results)
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=2`)
})
.then(response=>{
    arr=arr.concat(response.data.results)
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=3`)
 })
 .then(response=>{
    arr=arr.concat(response.data.results)
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=4`)
 })
 .then(response=>{
    arr=arr.concat(response.data.results)
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=5`)
 })
 .then(response=>{
    arr=arr.concat(response.data.results)
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=6`)
 })
 .then(response=>{
    arr=arr.concat(response.data.results)
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=7`)
 })
 .then(response=>{
    arr=arr.concat(response.data.results)
    console.log(arr);
    // console.log(arr[0].video)
    gallerymovies_arr.gallery.gallery=arr
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${themoviedbAPIKey}&language=en-US&page=8`)
 })
 .catch(err=>{
     console.log(err)
 })
                return {
                    ...state,
                    gallery:gallerymovies_arr,
                   

                }

            case FETCH_MOVIE:
                return {
                    ...state,
                    movie:action.payload,
                    loading: false
                    };
            case LOADING:
                return {
                    ...state,
                    loading: true
                };
            case SORT_BY_TITLE:
                const sortByTitle = Object.assign({}, state);
                let sortedTitleArr = state.movies.radio === "asc" ?
                    sortAsc(state.movies.Search, 'Title') :
                    sortDesc(state.movies.Search, 'Title');
                    sortedTitleArr.movies=sortedTitleArr
            return {
                ...state,
                sortby:'title',
                Search:sortByTitle
            };

            case SORT_BY_YEAR:
                const sortByYear = Object.assign({}, state);
                let sortedYearArr = state.movies.radio === "asc" ?
                    sortAsc(state.movies.Search, 'Year') :
                    sortDesc(state.movies.Search, 'Year');
                    sortedYearArr.movies=sortedYearArr
            return {
                ...state,
                sortby:'year',
                Search:sortByYear
            };

             default:
                 return state;
     }
 }