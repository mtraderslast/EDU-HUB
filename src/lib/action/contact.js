import axios from "axios";
import { apiHandler } from "./apiHandler";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`;

export const sendContactEmail = (formData) => {
    return apiHandler(() =>
        axios.post(`${API_URL}`, formData, { withCredentials: true })
    );
};