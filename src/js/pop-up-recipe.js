// https://tasty-treats-backend.p.goit.global/api/recipes/recipeID;
import axios from 'axios';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal() {
  window.addEventListener('keydown', onEscapeKeyPress);
  refs.backdrop.classList.remove('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscapeKeyPress);
  refs.backdrop.classList.add('is-hidden');
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
};

function onEscapeKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
};
