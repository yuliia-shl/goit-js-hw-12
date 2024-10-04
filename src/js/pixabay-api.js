import axios from 'axios';
import { loader } from '../main.js';

const API_KEY = '46159699-3637bafd8e7308a1e0528cb6d';
const BASE_URL = 'https://pixabay.com/api/';
let page = 1;

export async function fetchImages(searchValue, page) {
  loader.classList.remove('hidden');
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
}

//Reset the page to 1 for new search
export function resetPage() {
  page = 1;
}
