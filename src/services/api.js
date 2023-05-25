const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35065160-4f8cc67178494d61c2fc4e213';
const PER_PAGE = 12
export const getImages = (searchText, page) => {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  )
};

