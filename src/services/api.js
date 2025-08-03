import axios from 'axios';

const API = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchPosts = async () => {
    const response = await API.get('/posts');

    return response.data;
};

export const fetchUsers = async () => {
    const response = await API.get(`/users`);

    return response.data;
};

export const deletePost = async (postId) => {
    await API.delete(`/posts/${postId}`);

    return postId;
};