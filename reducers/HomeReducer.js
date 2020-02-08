const HomePageReducer = (state = {
    isFetching : false,
    popularMovies : [], 
    popularTv : [], 
    topRatedMovies : [], 
}, action) => {
    switch (action.type) {
        case "DATA_REQUESTED":
            return {
                ...state,
                isFetching : true
            };

        case "DATA_RECEIVED":
            const appendTypeToMovie = action.payload.popularMovie.results.map(item => Object.assign({}, item, {media_type : "movie"})); 
            const appendTypeToTv = action.payload.popularTv.results.map(item => Object.assign({}, item, {media_type : "tv"})); 
            const appendTypeToTopRated = action.payload.topRated.results.map(item => Object.assign({}, item, {media_type : "movie"}));
            return {
                ...state,
                popularMovies : appendTypeToMovie,
                popularTv : appendTypeToTv,
                topRatedMovies : appendTypeToTopRated,
                isFetching : false
            };
        default:
            return state;
    }
}

export default HomePageReducer;