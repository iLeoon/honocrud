"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
const api_1 = require("@/lib/api");
async function getPosts() {
    const { data } = await api_1.api.get('/posts');
    return data.posts;
}
async function getPost(id) {
    const { data } = await api_1.api.get(`/posts/${id}`);
    return data.post;
}
async function createPost(payload) {
    const { data } = await api_1.api.post('/posts', payload);
    return data;
}
async function updatePost(id, payload) {
    const { data } = await api_1.api.put(`/posts/${id}`, payload);
    return data;
}
async function deletePost(id) {
    const { data } = await api_1.api.delete(`/posts/${id}`);
    return data;
}
