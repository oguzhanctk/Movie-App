import { connect } from "react-redux";
import Search from "../navigation/Components/Search";

mapStateToProps = (state) => ({
    isLoading : state.DiscoverReducer.isLoading,
});

mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Search); 