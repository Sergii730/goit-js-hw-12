import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMoreButton,
} from './js/render-functions';

let page = 1;
let query = '';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  hideLoadMoreButton();
  if (event.target.elements['search-text'].value.trim() !== query) {
    query = event.target.elements['search-text'].value.trim();
    page = 1;
  }

  if (query === '') {
    return;
  }
  showLoader();
  clearGallery();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    if (hits.length === 0) {
      hideLoadMoreButton();
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomRight',
      });
    } else {
      createGallery(hits);
      if (page * PER_PAGE < totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'bottomRight',
        });
      }
    }
    hideLoader();
  } catch (error) {
    console.log(error.message);
  }
  event.target.reset();
}

async function handleLoadMore() {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    hideLoader();
    createGallery(hits);

    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight',
      });
    }
    const item = document.querySelector('.gallery-item');
    const itemHeight = item.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error.message);
  }
}
