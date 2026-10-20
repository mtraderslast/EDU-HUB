import axios from "axios";
import { apiHandler } from "./apiHandler";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments`;

export const fetchActiveGateway = () => {
    return apiHandler(() => axios.get(`${API_URL}/active-gateway`));
};

export const fetchAdminGateways = () => {
    return apiHandler(() => axios.get(`${API_URL}/admin/gateways`, { withCredentials: true }));
};

export const switchPaymentGateway = (gateway) => {
    return apiHandler(() =>
        axios.patch(`${API_URL}/admin/switch-gateway`, { gateway }, { withCredentials: true })
    );
};
