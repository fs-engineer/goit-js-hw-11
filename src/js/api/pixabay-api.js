import axios from 'axios';

const API_KEY = '13118160-85f169275baea695b5828e8ed';
const URL = 'https://pixabay.com/api/';

const fetchImages = async (query, page) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 50,
    page,
  };

  try {
    return await axios.get(URL, { params });
  } catch (error) {
    return error;
  }
};

export default fetchImages;
