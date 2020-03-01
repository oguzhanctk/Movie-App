import Discover from "../navigation/Components/Discover";
import { connect } from "react-redux";
import axios from "axios";

export const fetch_Search_Results = (url) => {

    return async dispatch => {
        dispatch({
            type : "RESULTS_REQUESTED"
        });
        await axios.get(url)
        .then(response => {
            dispatch({
                type : "RESULTS_RECEIVED",
                payload : response.data.results
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type : "SEARCH_FAILED"
            })
        });
    }
}

const mapStateToProps = (state) => ({
    isLoading : state.DiscoverReducer.isLoading,
    searchResults : state.DiscoverReducer.results,
})

const mapDispatchToProps = (dispatch) => ({
    fetchSearchResults : (url) => dispatch(fetch_Search_Results(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
