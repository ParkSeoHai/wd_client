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

function formatter(price) {
    // Format currency
    const formatVND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    return formatVND.format(price);
}

export { fetchApi, formatter };