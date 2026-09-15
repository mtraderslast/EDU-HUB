import axios from "axios";
import { apiHandler } from "./apiHandler";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`;

export const getHomeTopReviewsApi = (params = {}) => {
    return apiHandler(() =>
        axios.get(`${API_URL}/home-page-review`)
    );
};