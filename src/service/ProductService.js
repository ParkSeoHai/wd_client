import axios from "axios";

async function fetchApi(url, method = "GET", data = null) {
    try {
        const response = await axios({
            method: method,
            url: url,
            data: data
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.status + " " + response.message);
        }
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it further
    }
}

async function getProductsByCategory($route, categoryName, limit) {
    const url = `${$route}/Product/GetProductsByCategory?name=${categoryName}&limit=${limit}`;
    return await fetchApi(url);
}

async function getProductByTextUrl($route, productUrl) {
    const url = `${$route}/Product/GetProductByTextUrl?textUrl=${productUrl}`;
    return await fetchApi(url);
}

export { getProductsByCategory, getProductByTextUrl };