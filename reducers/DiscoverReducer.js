const DiscoverReducer = (state = {
    results : [],
    isLoading : false,
}, action) => {
    switch (action.type) {
        case "RESULTS_REQUESTED":
            return {
                ...state,
                isLoading : true
            };
        case "RESULTS_RECEIVED":
            return {
                ...state,
                results : [...action.payload],
                isLoading : false,
            }
        case "SEARCH_FAILED":
            return {
                ...state,
                isLoading : false,
            }
        default:
            return state;
    }
}

export default DiscoverReducer;