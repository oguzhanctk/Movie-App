import { createGetRequest } from "./fetch";
import { key } from "./config";

const url = "https://api.themoviedb.org/3/";

const fetchPopularMovies = () => {
    createGetRequest(`${url}movies/popular/?api_key=${key.api_key}&language=en-US&page=1`);
}

export const MovieApi = {
    fetchPopularMovies,
}