import refs from './refs';
import scroll from './scroll';

const createModal = ({
  largeimageurl,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `<div class="modal">
  <div class="backdrop">
    <div class="modal-content">
      <img src="${largeimageurl}" alt="${tags}" width="800" />
    </div>
  </div>
</div>`;
};

const removeModal = e => {
  const modal = document.querySelector('.modal');

  if (e.code === 'Escape') {
    refs.bodyEl.removeChild(modal);
    window.removeEventListener('keydown', removeModal);
    scroll.enableScroll();
  }

  if (e.currentTarget === e.target) {
    refs.bodyEl.removeChild(modal);
    modal.removeEventListener('click', removeModal);
    scroll.enableScroll();
  }
};

export default { createModal, removeModal };
