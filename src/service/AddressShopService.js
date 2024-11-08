import axios from "axios";

// Get value address shop
async function getAddressShops($route) {
    const url = `${$route}/AddressShop/GetAddressShops`;
    try {
        const response = await axios.get(url);
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error("Error " + response.status);
        }
    } catch(error) {
        console.error(error);
        throw error.message;
    }
}

export default getAddressShops;