import { MovieCard } from "../navigation/Components/microComponents/MovieCard";
import { connect } from "react-redux";

const update_Movie_Card = (id) => ({
    type : "UPDATE_MOVIE_CARD",
    payload : id
});

const mapStateToProps = (state) => ({
    popularMovies : state.HomePageReducer.popularMovies,
    latestMovies : state.HomePageReducer.latestMovies,
    topRatedMovies : state.HomePageReducer.topRatedMovies
});

const mapDispatchToProps = (dispatch) => ({
    updateMovieCard : (id) => dispatch(update_Movie_Card(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
