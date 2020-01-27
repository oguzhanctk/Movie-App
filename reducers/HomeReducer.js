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
        case "UPDATE_MOVIE_CARD":
            const temp = state.popularMovies.map(item => {
                if(item.id === action.payload) {  
                    return Object.assign(item, {isSaved : !item.isSaved});
                } else {
                    return {...item};
                }
            });
            return {
                ...state,
                popularMovies : [...temp]
            };
        default:
            return state;
    }
}

export default HomePageReducer;