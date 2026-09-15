import axios from "axios";
import { apiHandler } from "./apiHandler";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`;

export const fetchMyEnrolledCourses = () => {
    return apiHandler(() => axios.get(`${API_URL}/my-courses`, { withCredentials: true }));
};

export const fetchAdminEnrollments = (page = 1, search = '', status = 'ALL') => {
    return apiHandler(() =>
        axios.get(`${API_URL}/user-enrollment?page=${page}&limit=10&search=${search}&status=${status}`, {
            withCredentials: true
        })
    );
};

export const deleteEnrollment = (id) => {
    return apiHandler(() => axios.delete(`${API_URL}/${id}`, { withCredentials: true }));
};