import { connect } from "react-redux";
import Home from "../navigation/Components/Home";
import axios from "axios";
import { constants } from "../api/config";

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
            console.log(p.data)
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
    popularMovies : state.popularMovies,
    latestMovies : state.latestMovies,
    topRatedMovies : state.topRatedMovies,
    isLoading : state.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDataFromApi : (p, l, t) => dispatch(fetch_Data_From_Api(p, l, t)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);