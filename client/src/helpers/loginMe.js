import axios from 'axios'
import url from './getURL.js'

const loginMe = async () => {
    let response
    await axios
        .get(url('users/me'), { withCredentials: true })
        .then((resp) => {
            response = resp.data.data
        })
        .catch((error) => {
            response = error
        })
    return response
}

export default loginMe
