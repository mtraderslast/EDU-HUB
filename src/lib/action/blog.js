import axios from "axios";
import { apiHandler } from "./apiHandler";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`;

export const fetchAllBlog = (params = {}) => {
    return apiHandler(() => axios.get(API_URL, { params }));
};

export const fetchBlogDetails = (id) => {
    return apiHandler(() => axios.get(`${API_URL}/${id}`));
};

export const createBlog = (BlogData) => {
    return apiHandler(() => axios.post(API_URL, BlogData, { withCredentials: true }));
};

export const updateBlog = (id, BlogData) => {
    return apiHandler(() => axios.patch(`${API_URL}/${id}`, BlogData, { withCredentials: true }));
};

export const deleteBlog = (id) => {
    return apiHandler(() => axios.delete(`${API_URL}/${id}`, { withCredentials: true }));
};