import refs from './refs';

const disableScroll = () => {
  let pagePosition = window.scrollY;
  refs.bodyEl.classList.add('disable-scroll');
  refs.bodyEl.dataset.position = pagePosition;
  refs.bodyEl.style.top = -pagePosition + 'px';
};

const enableScroll = () => {
  let pagePosition = parseInt(refs.bodyEl.position, 10);
  console.log('pagePosition: ', pagePosition);
  refs.bodyEl.style.top = 'auto';
  refs.bodyEl.classList.remove('disable-scroll');
  window.scroll({ top: pagePosition, left: 0 });
  refs.bodyEl.removeAttribute('data-position');
};

export default { disableScroll, enableScroll };
