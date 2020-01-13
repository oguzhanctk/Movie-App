import axios from "axios";

export const createGetRequest = url => {
    axios.get(url)
    .then(response => console.log(response))
    .catch(err => console.log(err))
}

