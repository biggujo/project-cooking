(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();

(() => {
  const refs = {
    lightTheme: document.querySelector('[data-light-theme]'),
    darkTheme: document.querySelector('[data-dark-theme]'),
    switch: document.querySelector('[data-button]'),
  };

  refs.lightTheme.addEventListener('click', () => {
    if (!refs.lightTheme.classList.contains('is-hiddenss')) {
      refs.lightTheme.classList.add('is-hiddenss');
      refs.darkTheme.classList.remove('is-hiddenss');
    }
  });

  refs.darkTheme.addEventListener('click', () => {
    if (!refs.darkTheme.classList.contains('is-hiddenss')) {
      refs.darkTheme.classList.add('is-hiddenss');
      refs.lightTheme.classList.remove('is-hiddenss');
    }
  });
})();
