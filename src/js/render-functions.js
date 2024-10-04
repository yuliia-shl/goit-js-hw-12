import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
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
  lightbox.refresh();
}

// Clearing the gallery
export function clearGallery() {
  gallery.innerHTML = '';
}
