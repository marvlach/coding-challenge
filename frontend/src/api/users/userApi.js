import httpApi from '../httpApi.js';

export async function getUsers(params={all: true}) {
    return await httpApi.get(`user`, params,);
}

export async function getUser() {
    return await httpApi.get(`user`);
}

export async function getUserById(id) {
    return await httpApi.get(`user/${id}`);
}

export async function createUser(data) {
    return await httpApi.post(`user/add`, data );
}

export async function signup(data) {
    return await httpApi.post(`user/signup`, data );
}

export async function loginUser(data) {
    return await httpApi.post(`user/login`, data );
}

export async function updateUser(id, data) {
    return await httpApi.patch(`user/${id}`, data );
}

export async function deleteUser(id) {
    return await httpApi.delete(`user/${id}`);
}

