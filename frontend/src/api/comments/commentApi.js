import httpApi from '../httpApi.js';

export async function getCommentsByRecipientId(recipientId) {
    return await httpApi.get(`comment/`, params={recipientId: recipientId},);
}

export async function getCommentsByAuthorId(authorId) {
    return await httpApi.get(`comment/`, params={authorId: authorId});
}

export async function getCommentsByAuthorAndRecipient(authorId, recipientId) {
    return await httpApi.get(`comment/`, params={authorId: authorId, recipientId: recipientId});
}

export async function getCommentById(id) {
    return await httpApi.get(`comment/${id}`);
}

export async function postComment(data) {
    return await httpApi.post(`comment`, data);
}
