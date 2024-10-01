import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const API_KEY = '46159699-3637bafd8e7308a1e0528cb6d';
const BASE_URL = 'https://pixabay.com/api/';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchValue = searchInput.value.trim();
  if (searchValue === '') {
    iziToast.warning({
      message: 'Please fill this field',
      position: 'topRight',
    });
    return;
  }
  fetchImages(searchValue);
});

function fetchImages(searchValue) {
  loader.classList.remove('hidden');
  gallery.innerHTML = '';
  lightbox.refresh();

  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    searchValue
  )}&image_type=photo&orientation=horizontal&safesearch=true`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! статус: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        loader.classList.add('hidden');
      } else {
        createGallery(data.hits);
        lightbox.refresh();
        loader.classList.add('hidden');
        searchInput.value = '';
      }
    })
    .catch(error => {
      console.error('Помилка:', error);
      iziToast.error({
        message: 'Something went wrong! Please try again later.',
        position: 'topRight',
      });
    });
}

function createGallery(images) {
  const markup = images
    .map(image => {
      return `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
            <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="360px" height="200px" />
        </a>

        <ul class="image-info">
          <li class="image-item">
            Likes
            <p class="image-name">${image.likes}</p>
          </li>
          <li class="image-item">
            Views
            <p class="image-name">${image.views}</p>
          </li>
          <li class="image-item">
            Comments
            <p class="image-name">${image.comments}</p>
          </li>
          <li class="image-item">
            Downloads
            <p class="image-name">${image.downloads}</p>
          </li>
        </ul>

      </li> `;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
