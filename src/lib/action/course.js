import axios from "axios";
import { apiHandler } from "./apiHandler";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course`;

export const fetchAllCourse = (params = {}) => {
    return apiHandler(() => axios.get(API_URL, { params }));
};

export const fetchCourseDetails = (id) => {
    return apiHandler(() => axios.get(`${API_URL}/${id}`));
};

export const createCourse = (CourseData) => {
    return apiHandler(() => axios.post(API_URL, CourseData, { withCredentials: true }));
};

export const updateCourse = (id, CourseData) => {
    return apiHandler(() => axios.patch(`${API_URL}/${id}`, CourseData, { withCredentials: true }));
};

export const deleteCourse = (id) => {
    return apiHandler(() => axios.delete(`${API_URL}/${id}`, { withCredentials: true }));
};