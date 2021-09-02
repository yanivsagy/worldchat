import fetch from 'isomorphic-fetch';

export const populateMap = () => {
    return fetch(`${ process.env.REACT_APP_API }/api/map/populate-map`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}