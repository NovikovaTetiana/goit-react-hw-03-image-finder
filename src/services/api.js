const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35065160-4f8cc67178494d61c2fc4e213';

export const getImages = (searchText) => {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
};

