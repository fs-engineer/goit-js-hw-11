import fetchImages from './js/api/pixabay-api';
import notiflix from 'notiflix';

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

const getImageData = async query => {
  try {
    const { data } = await fetchImages(query);
    const { total, hits } = data;
    const sanitizedImagesData = sanitizeImageData(hits);

    if (!sanitizeImageData) {
      notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return null;
    }
  } catch (error) {
    console.log('error11', error);
  }
};

getImageData('reasdfasfasfdd');
