import { fetchWithDelay } from "./fetch";

const url = "https://jsonplaceholder.typicode.com/todos/1";
const fetchMovies = () => fetchWithDelay(url);

export const MovieApi = {
    fetchMovies,
}