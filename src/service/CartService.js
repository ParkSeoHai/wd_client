"use strict"

import axios from "axios";

export const getCart = async (urlApi) => {
    try {
        const response = await axios.get(urlApi);
        return response.data?.metadata;
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

export const updateQuantityItem = async ({ cartId, cartItemId, value, urlApi }) => {
    try {
        const response = await axios.post(urlApi, {
            cartId, cartItemId, value
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

export const removeItem = async ({ cartId, cartItemId, urlApi }) => {
    try {
        const response = await axios.post(urlApi, {
            cartId, cartItemId
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