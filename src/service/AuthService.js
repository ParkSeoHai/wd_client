"use strict"

import axios from "axios"

export const login = async ({ email, password, urlApi }) => {
    try {
        const response = await axios.post(urlApi, {
            email, password
        });
        return response.data;
    } catch (error) {
        // Kiểm tra lỗi và xử lý phù hợp
        if (error.response) {
            // Lỗi từ server
            throw new Error(error.response.data.message || "Lỗi từ server");
        } else if (error.request) {
            // Không nhận được phản hồi
            throw new Error("Không có phản hồi từ server. Vui lòng thử lại.");
        } else {
            // Lỗi khác
            throw new Error("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
    }
}

export const register = async ({ name, email, phone_number, password, urlApi }) => {
    try {
        const response = await axios.post(urlApi, {
            name, email, phone_number, password
        });
        return response.data;
    } catch (error) {
        // Kiểm tra lỗi và xử lý phù hợp
        if (error.response) {
            // Lỗi từ server
            throw new Error(error.response.data.message || "Lỗi từ server");
        } else if (error.request) {
            // Không nhận được phản hồi
            throw new Error("Không có phản hồi từ server. Vui lòng thử lại.");
        } else {
            // Lỗi khác
            throw new Error("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
    }
}