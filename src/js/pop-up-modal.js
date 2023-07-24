export class PopUpModal {
  refs;

  constructor({ openModalSelector, closeModalSelector, backdropSelector }) {
    this.refs = {
      openModalBtn: document.querySelector(openModalSelector),
      closeModalBtn: document.querySelector(closeModalSelector),
      backdrop: document.querySelector(backdropSelector),
    };

    this.refs.openModalBtn.addEventListener(
      'click',
      this.onOpenModal.bind(this)
    );
    this.refs.closeModalBtn.addEventListener(
      'click',
      this.onCloseModal.bind(this)
    );
    this.refs.backdrop.addEventListener(
      'click',
      this.onBackdropClick.bind(this)
    );
  }

  onOpenModal = () => {
    window.addEventListener('keydown', this.onEscapeKeyPress);
    this.refs.backdrop.classList.remove('is-hidden');
  };

  onCloseModal = () => {
    window.removeEventListener('keydown', this.onEscapeKeyPress);
    this.refs.backdrop.classList.add('is-hidden');
  };

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.onCloseModal();
    }
  };

  onEscapeKeyPress = e => {
    console.log(e);
    if (e.code === 'Escape') {
      this.onCloseModal();
    }
  };
}
