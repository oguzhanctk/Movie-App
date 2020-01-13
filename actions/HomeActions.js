import { connect } from "react-redux";
import Home from "../navigation/Components/Home";
import axios from "axios";
import { constants } from "../api/config";

export const fetch_Data_From_Api = (url) => {
    return async dispatch => {
        dispatch({
            type : "DATA_REQUESTED" 
        });
        await axios.get(url)
            .then(response => {
                console.log(response.data);
                dispatch({
                    type : "DATA_RECEIVED",
                    payload : response.data
                });
            })
            .catch(err => console.log(err));
    }
} 

const mapStateToProps = (state) => ({
    popularMovies : state.popularMovies,
    isLoading : state.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDataFromApi : (url) => dispatch(fetch_Data_From_Api(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);