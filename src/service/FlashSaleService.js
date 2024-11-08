import axios from "axios";

async function getFlashSale($route) {
    const url = `${$route}/Product/GetFlashSale`;
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return Object.freeze(response.data);
        } else {
            throw new Error(response.status + " " + response.message);
        }
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it further
    }
}

export { getFlashSale };