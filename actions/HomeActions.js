import { connect } from "react-redux";
import Home from "../navigation/Components/Home";
import axios from "axios";

export const fetch_Data_From_Api = (movie, tv, topRated) => {
    return async dispatch => {
        dispatch({
            type : "DATA_REQUESTED" 
        });
        axios.all([
            await axios.get(movie),
            await axios.get(tv),
            await axios.get(topRated)
        ])
        .then(axios.spread((p, l, t) => {
            // console.log(p.data, "HomeActions -> 17");
            dispatch({
                type : "DATA_RECEIVED",
                payload : {
                    popularMovie : p.data,
                    popularTv : l.data,
                    topRated : t.data
                }
            });
        }))
        .catch(err => {
            console.log(err + "homeActions->27");
            dispatch({
                type : "REQUEST_FAILED",
                payload : err
            })
        });
    }
}

const mapStateToProps = (state) => ({
    popularMovies : state.HomePageReducer.popularMovies,
    popularTv : state.HomePageReducer.popularTv,
    topRatedMovies : state.HomePageReducer.topRatedMovies,
    isLoading : state.HomePageReducer.isFetching,
    isConnected : state.HomePageReducer.isConnected,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDataFromApi : (p, l, t) => dispatch(fetch_Data_From_Api(p, l, t)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);