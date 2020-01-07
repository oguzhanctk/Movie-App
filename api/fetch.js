import { trackPromise } from "react-promise-tracker";

export const fetchWithDelay = url => {
        trackPromise(
            fetch(url)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
            )
}

export const testFunction = () => {
    console.log("testing");
}
