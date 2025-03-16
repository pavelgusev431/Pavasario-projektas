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

const getHotProducts = async () => {
    try {
        const response = await axios.get(url('products', 'bestnew'));
        return response;
    } catch (error) {
        console.error('❌ Ошибка получения популярных товаров:', error);
        return null;
    }
};

const getTopRatedProducts = async () => {
    try {
        const response = await axios.get(url('products', 'top'));
        return response;
    } catch (error) {
        console.error('❌ Ошибка получения товаров с высоким рейтингом:', error);
        return null;
    }
};

const getTopUserProducts = async () => {
    try {
        const response = await axios.get(url('products', 'alltopuserproducts'));
        return response;
    } catch (error) {
        console.error('❌ Ошибка получения топовых товаров пользователя:', error);
        return null;
    }
};

const getTrendingUserProducts = async () => {
    try {
        const response = await axios.get(url('products', 'trending'));
        return response;
    } catch (error) {
        console.error('❌ Ошибка получения трендовых товаров:', error);
        return null;
    }
};

export { getProductById, getProductsByUserId, getAllUsersProducts, getHotProducts, getTopRatedProducts, getTopUserProducts, getTrendingUserProducts };
