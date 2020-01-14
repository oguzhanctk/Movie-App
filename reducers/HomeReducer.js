const HomePageReducer = (state = {
    isFetching : false,
    popularMovies : [], 
    latestMovies : [], 
    topRatedMovies : [], 
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
                popularMovies : [...action.payload.popular.results],
                latestMovies : [...action.payload.latest.results],
                topRatedMovies : [...action.payload.topRated.results],
                isFetching : false
            };
        default:
            return state;
    }
}

export default HomePageReducer;