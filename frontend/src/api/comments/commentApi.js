import httpApi from '../httpApi.js';

export async function getCommentsByRecipientId(recipientId) {
    return await httpApi.get(`comment/`, {recipientId: recipientId},);
}

export async function getCommentsByAuthorId(authorId) {
    return await httpApi.get(`comment/`, {authorId: authorId});
}

export async function getCommentsByAuthorAndRecipient(authorId, recipientId) {
    return await httpApi.get(`comment/`, {authorId: authorId, recipientId: recipientId});
}

export async function getCommentById(id) {
    return await httpApi.get(`comment/${id}`);
}

export async function postComment(data) {
    console.log('data', data)
    return await httpApi.post(`comment/`, data);
}
