
export const getTokenFromLocalStorage = () => {
    const token = JSON.parse(localStorage.getItem('coding-challenge'));
    return token ? token : null;
}

export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('coding-challenge', JSON.stringify(token));
}

export const clearTokenInLocalStorage = () => {
    localStorage.removeItem('coding-challenge');
}

