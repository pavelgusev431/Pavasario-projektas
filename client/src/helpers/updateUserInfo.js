import axios from 'axios';
import url from './getURL.js';
// some future imports
// import {sha1} from "js-sha1";
// import {sha256} from "js-sha256";

const updateUserInfo = async (id, data) => {
    const response = await axios
        .patch(url(`/users/update/${id}`, data))
        .catch((error) => console.log(error));
    return response;
};

export { updateUserInfo };
