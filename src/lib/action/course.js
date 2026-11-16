import axios from "axios";
import { apiHandler } from "./apiHandler";

const backendBase = () => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    if (typeof window === "undefined") {
        return base.replace("localhost", "127.0.0.1");
    }
    return base;
};

const API_URL = () => `${backendBase()}/api/course`;

export const unwrapCourse = (res) => {
    if (!res || typeof res !== "object") return null;
    if (res.success === false) return null;

    const payload = res.data?.data ?? res.data ?? res.course ?? res;
    if (!payload || typeof payload !== "object") return null;
    if (payload.success === true && payload.data) return payload.data;
    if (payload._id || payload.id || payload.title) return payload;
    return null;
};

export const fetchAllCourse = (params = {}) => {
    return apiHandler(() => axios.get(API_URL(), { params }));
};

export const fetchCourseDetails = (id) => {
    return apiHandler(() => axios.get(`${API_URL()}/${id}`, { withCredentials: true }));
};

export const fetchEnrolledCourseContent = (id) => {
    return apiHandler(() => axios.get(`${API_URL()}/${id}/learn`, { withCredentials: true }));
};

export const fetchMyCourses = () => {
    return apiHandler(() => axios.get(`${API_URL()}/my-courses`, { withCredentials: true }));
};

export const createCourse = (CourseData) => {
    return apiHandler(() => axios.post(API_URL(), CourseData, { withCredentials: true }));
};

export const updateCourse = (id, CourseData) => {
    return apiHandler(() => axios.patch(`${API_URL()}/${id}`, CourseData, { withCredentials: true }));
};

export const deleteCourse = (id) => {
    return apiHandler(() => axios.delete(`${API_URL()}/${id}`, { withCredentials: true }));
};