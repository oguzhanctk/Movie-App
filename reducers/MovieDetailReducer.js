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
            const date = action.payload.release_date && action.payload.release_date.split("-")[0] || action.payload.first_air_date.split("-")[0];
            const credits = action.payload.credits.cast && action.payload.credits.cast.splice(0,7);
            return {
                ...state,
                isLoading : false,
                movieDetail : Object.assign({}, action.payload, {release_date : date, credits : credits})
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