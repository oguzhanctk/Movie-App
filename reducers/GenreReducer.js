const GenreReducer = (state = {
    genreResults : [],
    genreIsLoading : false,
}, action) => {
    switch (action.type) {
        case "GENRE_REQUESTED":
            return {
                ...state,
                genreIsLoading : true
            };
        case "GENRE_RECEIVED":
            return {
                ...state,
                genreResults : [...action.payload],
                genreIsLoading : false,
            };
        case "CLEAR_RESULT_ARRAY":
            return {
                ...state,
                genreResults : []
            };
        case "GENRE_FAIL":
            return {
                ...state,
                genreIsLoading : false,
            };
        default:
            return state;
    }
}

export default GenreReducer;