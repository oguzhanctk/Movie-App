const HomePageReducer = (state = {
    isFetching : false,
    popularMovies : [] 
}, action) => {
    switch (action.type) {
        case "DATA_REQUESTED":
            return {
                ...state,
                isFetching : true
            };

        case "DATA_RECEIVED":
            return {
                ...state,
                // popularMovies : [...action.payload.results]
            }; 

        default:
            return state;
    }
}

export default HomePageReducer;