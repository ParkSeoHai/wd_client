import axios from "axios";

async function fetchApi(url) {
    try {
        const response = await axios.get(url);
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

async function getProductByName($route, productName) {
    const url = `${$route}/Product/GetProductByName?name=${productName}`;
    return await fetchApi(url);
}

export { getProductsByCategory, getProductByName };