import axios from 'axios';
import url from './getURL.js';

const createComment = async (data) => {
  const response = await axios.post(url('comments/comment'), data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
    },
  });
  return response;
};

export default createComment;

