import { connect } from "react-redux";
import Home from "../navigation/Components/Home";
import axios from "axios";

const addIsSavedObject = (arr) => {
    for(let i of arr) {
        i = Object.assign(i, {isSaved : false});
    }
}

export const fetch_Data_From_Api = (popular, latest, topRated) => {
    return async dispatch => {
        dispatch({
            type : "DATA_REQUESTED" 
        });
        axios.all([
            await axios.get(popular),
            await axios.get(latest),
            await axios.get(topRated)
        ])
        .then(axios.spread((p, l, t) => {
            addIsSavedObject(p.data.results);
            addIsSavedObject(l.data.results);
            addIsSavedObject(t.data.results);
            // console.log(p.data, "HomeActions -> 17");
            dispatch({
                type : "DATA_RECEIVED",
                payload : {
                    popular : p.data,
                    latest : l.data,
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
        })
    }
}

const mapStateToProps = (state) => ({
    popularMovies : state.HomePageReducer.popularMovies,
    latestMovies : state.HomePageReducer.latestMovies,
    topRatedMovies : state.HomePageReducer.topRatedMovies,
    isLoading : state.HomePageReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDataFromApi : (p, l, t) => dispatch(fetch_Data_From_Api(p, l, t)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);