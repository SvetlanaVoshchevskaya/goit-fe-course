const API_KEY = '5cbc932005cc2fef2feccc241c68219121c116ceccaeb';

export default function fetchData(query) {
    const url = `https://api.linkpreview.net/?key=${API_KEY}&q=${query}`;
    return fetch(url)
        .then(response =>
            response.json()
        )
        .catch(err => console.log(err))

}
