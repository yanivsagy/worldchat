import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

export const preSignup = (user) => {
    return fetch(`${ process.env.REACT_APP_API }/api/auth/pre-signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signup = (user) => {
    return fetch(`${ process.env.REACT_APP_API }/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signin = (user) => {
    return fetch(`${ process.env.REACT_APP_API }/api/auth/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const signout = (next) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    return fetch(`${ process.env.REACT_APP_API }/api/auth/signout`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, { expires: 1 });
    }
};

export const getCookie = (key) => {
    if (process.browser) {
        return cookie.get(key);
    }
};

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, { expires: 1 });
    }
};

export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getLocalStorage = (key) => {
    if (process.browser) {
        return JSON.parse(localStorage.getItem(key));
    }
};

export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};

export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            const userChecked = getLocalStorage('user');
            if (userChecked) {
                return userChecked;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
};

export const updateUser = (user, next) => {
    if (process.browser) {
        if (getLocalStorage('user')) {
            let auth = getLocalStorage('user');
            auth = user;
            setLocalStorage('user', auth);
            next();
        }
    }
};