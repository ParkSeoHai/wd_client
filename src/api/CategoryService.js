import axios from "axios";

// Hàm lấy danh mục theo cấp độ
async function getCategoriesByLevel($route, level) {
    const url = `${$route}/Category/GetCategoriesByLevel?level=${level}`;
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

// Hàm lấy danh mục theo cấp độ
async function getCategoriesLevel2($route, categoryName) {
    const url = `${$route}/Category/GetCategoriesLevel2?categoryName=${categoryName}`;
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

export { getCategoriesByLevel, getCategoriesLevel2 }