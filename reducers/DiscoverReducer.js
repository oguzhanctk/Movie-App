const DiscoverReducer = (state = {
    results : [],
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
                results : Object.assign({}, action.payload),
                isLoading : false
            }
        case "FAIL":
            return {
                ...state,
                isLoading : false
            }
        default:
            return state;
    }
}

export default DiscoverReducer;