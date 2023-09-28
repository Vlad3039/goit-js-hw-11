import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import updateUI from './js/updateUI';
import { fetchPictures } from './js/fetch-picture';
import { makeURL, urlInfo } from './js/make-url';
import { createGalleryMarkup } from './js/myFirst-markup';
import { slowlyScroll } from './js/slowly-scroll';
import { showLoader, hideLoader } from './js/loader';

const lightbox = new SimpleLightbox('.gallery a');

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.search-btn'),
  galleryWrapper: document.querySelector('.gallery'),
};

let totalPage = 1;

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  updateUI(event, refs.galleryWrapper);

  urlInfo.currentPage = 1;

  urlInfo.category = refs.input.value.trim();
  if (urlInfo.category === '')
    return Notiflix.Notify.failure('Please, enter something');
  const url = makeURL(urlInfo);
  try {
    const valueQuery = await fetchPictures(url);

    // console.log(valueQuery.hits);

    if (valueQuery.hits.length === 0)
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    Notiflix.Notify.success(`Hooray! We found ${valueQuery.totalHits} images.`);

    totalPage = Math.ceil(valueQuery.totalHits / 40);

    // console.log(valueQuery.totalHits);

    createGalleryMarkup(valueQuery, refs.galleryWrapper);
    urlInfo.currentPage += 1;
    slowlyScroll();
    lightbox.refresh();
    // const lightbox = new SimpleLightbox('.gallery a');

    refs.form.reset();
  } catch (error) {
    console.log(error);
  }
}

addEventListener('scroll', onScroll);

async function onScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // console.log(scrollHeight - 7000);
  if (scrollTop + clientHeight >= scrollHeight) {
    const url = makeURL(urlInfo);
    showLoader();
    try {
      const valueQuery = await fetchPictures(url);
      urlInfo.currentPage += 1;
      createGalleryMarkup(valueQuery, refs.galleryWrapper);
      slowlyScroll();
      lightbox.refresh();
      // const lightbox = new SimpleLightbox('.gallery a');
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  }
}
