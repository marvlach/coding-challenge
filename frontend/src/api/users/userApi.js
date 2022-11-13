import httpApi from '../httpApi.js';

export async function getUsers(params={all: true}) {
    return await httpApi.get(`user`, params,);
}

export async function getUser(params={}) {
    return await httpApi.get(`user`, params,);
}

export async function getUserById(id, params={}) {
    return await httpApi.get(`user/${id}`, params,);
}

export async function createUser(data) {
    return await httpApi.post(`user/add`, data );
}

export async function loginUser(data) {
    return await httpApi.post(`user/login`, data );
}