const MovieDetailReducer = (state = {
    movieDetail : {},
    isLoading : false
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
                movieDetail : Object.assign({}, action.payload)
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