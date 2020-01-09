import { connect } from "react-redux";
import Home from "../navigation/Components/Home";

export const incCount = {
    type : "INCREMENT_COUNTER",
};

export const decCount = {
    type : "DECREMENT_COUNTER",
};

const mapStateToProps = (state) => ({
    counter : state.counter,
});

const mapDispatchToProps = (dispatch) => ({
    incrementCounter : () => dispatch(incCount),
    decrementCounter : () => dispatch(decCount),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);