import axios from 'axios';

const AUTH_TOKEN_COOKIE_KEY = 'auth-token';

export const setCookie = (name, value, days) => {
    let expires = "";

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

export const getCookie = (name) => {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }

        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }

    return null;
}

export const setAuthHeaders = () => {
    const authToken = getAuthToken();
    axios.interceptors.request.use(
        (config) => {
          if (authToken) {
            config.headers['authorization'] = `Bearer ${authToken}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
}

export const setAuthToken = (authToken) => {
    setCookie(AUTH_TOKEN_COOKIE_KEY, authToken);
}

export const getAuthToken = () => {
    return getCookie(AUTH_TOKEN_COOKIE_KEY);
}
