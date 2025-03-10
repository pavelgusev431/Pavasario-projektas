const getURL = (endpoint) => {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    console.log(`API Request to: ${baseURL}/${endpoint}`);
    return `${baseURL}/${endpoint}`;
};

export default getURL;
