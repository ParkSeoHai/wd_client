"use strict"
import axios from "axios";

// Func get all products by props.category url
export const getProductsByCategory = async ({categoryUrl, page = 1, limit = 10, sort, urlApi}) => {
    const url = `${urlApi}/api/v1/product/category/${categoryUrl}?p=${page}&limit=${limit}&sort=${sort}`;
    const response = await axios.get(url);
    return response.data;
};

// Func search product
export const searchProduct = async ({ searchStr, page = 1, limit = 10, sort, urlApi }) => {
    const url = `${urlApi}/api/v1/product?s=${searchStr}&p=${page}&limit=${limit}&sort=${sort}`;
    const response = await axios.get(url);
    return response.data;
}