import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreButton = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
        <a href="${largeImageURL}" class="gallery-link"><img class="gallery-img" src="${webformatURL}" alt="${tags}"/>
        <div class="rectangle">
        <p class="card-value"><b>Likes</b>: ${likes}</p>
        <p class="card-value"><b>Views</b>: ${views}</p>
        <p class="card-value"><b>Comments</b>: ${comments}</p>
        <p class="card-value"><b>Downloads</b>: ${downloads}</p>       
        </div>
        </a>
        </li>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.replace('is-hidden', 'is-show');
}

export function hideLoader() {
  loader.classList.replace('is-show', 'is-hidden');
}
export function showLoadMoreButton() {
  loadMoreButton.classList.replace('is-hidden', 'is-show');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.replace('is-show', 'is-hidden');
}
