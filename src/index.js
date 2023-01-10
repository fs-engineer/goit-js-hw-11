import fetchImages from './js/api/pixabay-api';
import notiflix from 'notiflix';
import throttle from 'lodash.throttle';
import modal from './js/modal';
import scroll from './js/scroll';

import refs from './js/refs';

let page = 1;
let totalPages = 0;
let queryValue = '';
const DEBOUNCE_DELAY = 500;
const IMAGES_PER_PAGE = 100;

window.addEventListener(
  'scroll',
  throttle(() => {
    infinityScroll();
  }, DEBOUNCE_DELAY)
);

const sanitizeImageData = data => {
  return data.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    })
  );
};

const getImageData = async (query, page) => {
  try {
    const { data } = await fetchImages(query, page);
    const { totalHits, hits } = data;
    const sanitizedImagesData = sanitizeImageData(hits);

    if (!sanitizeImageData) {
      notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return null;
    }

    notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

    page += 1;
    totalPages = Math.ceil(totalHits / IMAGES_PER_PAGE);

    return { totalHits, imageData: sanitizedImagesData };
  } catch (error) {
    console.log(error);
  }
};

const makeImageMarkup = images => {
  const { imageData } = images;

  return imageData
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" data-largeImageUrl="${largeImageURL}" data-likes="${likes}"
           data-views="${views}" data-comments="${comments} />
          <div class="info">
            <p class="info-item">
              <b>Likes: </b>${likes}
            </p>
            <p class="info-item">
              <b>Views: </b>${views}
            </p>
            <p class="info-item">
              <b>Comments: </b>${comments}
            </p>
            <p class="info-item">
              <b>Downloads: </b>${downloads}
            </p>
          </div>
        </div>
      `
    )
    .join('');
};

const generateMarkup = async query => {
  const imageData = await getImageData(query, page);

  const imageMarkup = makeImageMarkup(imageData);

  refs.galleryEl.insertAdjacentHTML('beforeend', imageMarkup);
};

const changeFormData = e => {
  e.preventDefault();

  queryValue = e.target.elements.searchQuery.value;

  if (queryValue) {
    generateMarkup(queryValue);
  }
};

function infinityScroll() {
  const viewPortBottom =
    document.documentElement.getBoundingClientRect().bottom;
  if (viewPortBottom < document.documentElement.clientHeight + 100) {
    page += 1;

    if (page > totalPages) {
      notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    generateMarkup(queryValue);
  }
}
generateMarkup('red');

const onClickCard = e => {
  const modalMarkup = modal.createModal(e.target.dataset);

  refs.bodyEl.insertAdjacentHTML('beforeend', modalMarkup);
  const backdrop = document.querySelector('.backdrop');

  backdrop.addEventListener('click', modal.removeModal);
  window.addEventListener('keydown', modal.removeModal);

  scroll.disableScroll();
};

refs.galleryEl.addEventListener('click', onClickCard);
refs.formEl.addEventListener('submit', changeFormData);
