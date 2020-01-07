const HomeReducer = (state = {
    counter : 0,
}, action) => {
    switch (action.type) {
        case "INCREMENT_COUNTER":
            return {
                ...state,
                counter : state.counter + 1
            }; break;
        case "DECREMENT_COUNTER":
            return {
                ...state,
                counter : state.counter - 1,
            }; break;
        default:
            return state; break;
    }
}

export default HomeReducer;