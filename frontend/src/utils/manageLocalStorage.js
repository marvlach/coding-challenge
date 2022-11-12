
export const getTokenFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('coding-challenge'))?.token;
}

export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('coding-challenge', JSON.stringify(token));
}