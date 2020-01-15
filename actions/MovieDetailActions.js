import MovieDetail from "../navigation/Components/MovieDetail";
import { connect } from "react-redux";
import axios from "axios";

export const fetch_Movie_Details = (url) => {
    return async dispatch => {
        dispatch({
            type : "MOVIE_REQUESTED"
        });
        await axios.get(url)
        .then(response => {
            dispatch({
                type : "MOVIE_RECEIVED",
                payload : response.data
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type : "FAILED"
            });
        });
    }
}

const mapStateToProps = (state) => ({
    isLoading : state.MovieDetailReducer.isLoading,
    movieDetail : state.MovieDetailReducer.movieDetail
})

const mapDispatchToProps = (dispatch) => ({
    fetchMovieDetails : (url) => dispatch(fetch_Movie_Details(url)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);