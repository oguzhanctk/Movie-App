const MovieDetailReducer = (state = {
    movieDetail : {},
    isLoading : false,
}, action) => {
    switch (action.type) {
        case "MOVIE_REQUESTED":
            return {
                ...state,
                isLoading : true
            };
        case "MOVIE_RECEIVED":
            return {
                ...state,
                isLoading : false,
                movieDetail : Object.assign({}, action.payload, {release_date : action.payload.release_date.split("-")[0]})
            };
        case "CLEAR_DATA":
            return {
                ...state,
                movieDetail : Object.assign({}, {})
            };
        case "FAIL":
            return {
                ...state,
                isLoading : false
            }
        default:
            return state;
    }
}

export default MovieDetailReducer;