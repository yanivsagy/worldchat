import fetch from 'isomorphic-fetch';

export const getAbout = (token) => {
    return fetch(`${ process.env.REACT_APP_API }/api/user/profile/about`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getLocation = (token) => {
    return fetch(`${ process.env.REACT_APP_API }/api/user/profile/location`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const editAbout = (userData, token) => {
    return fetch(`${ process.env.REACT_APP_API }/api/user/profile/edit/about`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: userData
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const editLocation = (userData, token) => {
    return fetch(`${ process.env.REACT_APP_API }/api/user/profile/edit/location`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: userData
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const uploadPhoto = (userData, token) => {
    return fetch(`${ process.env.REACT_APP_API }/api/user/profile/upload/photo`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: userData
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removePhoto = (token) => {
    return fetch(`${ process.env.REACT_APP_API }/api/user/profile/remove/photo`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listProfiles = (coordinates) => {
    return fetch(`${ process.env.REACT_APP_API }/api/user/profile/list`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coordinates)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getProfile = (username) => {
    return fetch(`${ process.env.REACT_APP_API }/api/user/profile/${ username }`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}