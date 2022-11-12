
export const getTokenFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("qr-code-generator-LiF-user-identifiers"))?.token;
}