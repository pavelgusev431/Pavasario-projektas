import axios from 'axios';
import url from './getURL.js';
import { useParams } from "react-router";

const getProductById = async (id) => {
    try {
        const response = await axios.get((`http://localhost:3000/products/${id}`));
        return response;
    } catch (error) {
        console.error('Klaida gaunant produktą pagal ID:', error);
        return null; 
    }
};

const getProductsByUserId = async (userId) => {
    const response = await axios.get(`http://localhost:3000/products/user/${userId}`);
    return response;
};

const getAllUsersProducts = async () => {
    
    try {
        const response = await axios.get("http://localhost:3000/products/users");
        console.log("📨 Sending GET request to: http://localhost:3000/products/users");  // <-- Проверяем URL
        console.log("✅ Response received:", response);  // <-- Проверяем ответ
        return response;
    } catch (error) {
        console.error("❌ Klaida užklausoje:", error);  // <-- Проверяем ошибку
        return { data: [] };
    }
};


export { getProductById, getProductsByUserId, getAllUsersProducts };
