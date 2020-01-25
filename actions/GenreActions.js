import Genre from "../navigation/Components/Genre";
import { connect } from "react-redux";
import axios from "axios";

export const fetch_Movies_With_Genre = (url) => {
    return async dispatch => {
        dispatch({
            type : "GENRE_REQESTED"
        });
        await axios.get(url)
        .then(response => {
            dispatch({
                type : "GENRE_RECEIVED",
                payload : response.data.results
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type : "GENRE_FAIL"
            })
        });
    }
}

const clearResultArray = {
    type : "CLEAR_RESULT_ARRAY"
}


const mapStateToProps = (state) => ({
    genreResults : state.GenreReducer.genreResults,
    isLoading : state.GenreReducer.genreIsLoading
});

const mapDispatchToProps = (dispatch) => ({
    fetchMoviesWithGenre : (url) => dispatch(fetch_Movies_With_Genre(url)),
    clearResultArray : () => dispatch(clearResultArray)
});

export default connect(mapStateToProps, mapDispatchToProps)(Genre);