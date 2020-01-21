import { connect } from "react-redux";
import Search from "../navigation/Components/Search";
import { fetch_Search_Results } from "./DiscoverActions";

mapStateToProps = (state) => ({
    isLoading : state.DiscoverReducer.isLoading,
    searchResults : state.DiscoverReducer.results,
});

mapDispatchToProps = (dispatch) => ({
    fetchSearchResults : (url) => dispatch(fetch_Search_Results(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search); 