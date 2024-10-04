import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages, resetPage } from './js/pixabay-api';
import { createGallery, clearGallery } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more-btn');
export const loader = document.querySelector('.loader');
let searchValue = '';
let page = 1;
let loadedImg = 0;
let totalImg = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  searchValue = searchInput.value.trim();
  if (searchValue === '') {
    iziToast.warning({
      message: 'Please fill this field',
      position: 'topRight',
    });
    return;
  }
  resetPage();
  clearGallery();
  loadedImg = 0;

  try {
    const { hits, totalHits } = await fetchImages(searchValue, page);
    loader.classList.add('hidden');

    if (hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      loader.classList.add('hidden');
      loadMoreBtn.classList.add('hidden');
      return;
    }
    totalImg = totalHits;
    loadedImg += hits.length;

    createGallery(hits);
    loadMoreBtn.classList.remove('hidden');
    loader.classList.add('hidden');

    if (loadedImg >= totalImg) {
      loadMoreBtn.classList.add('hidden');
      loader.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error('Error during receiving images:', error);
    iziToast.error({
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
    });
    loader.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  try {
    loadMoreBtn.classList.add('hidden');
    const { hits } = await fetchImages(searchValue, page);
    loadedImg += hits.length;
    loader.classList.add('hidden');
    loadMoreBtn.classList.remove('hidden');
    createGallery(hits);

    if (loadedImg >= totalImg) {
      loadMoreBtn.classList.add('hidden');
      loader.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    // Плавне прокручування
    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error loading additional images:', error);
  }
});
