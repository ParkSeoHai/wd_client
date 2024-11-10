"use strict"

import axios from "axios"

export const addItem = async ({ userId, cartItem, urlApi }) => {
    try {
        const response = await axios.post(urlApi, {
            userId, cartItem
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
