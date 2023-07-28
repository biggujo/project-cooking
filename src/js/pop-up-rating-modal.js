import axios from 'axios';
import Notiflix from 'notiflix';
import { PopUpModal } from './pop-up-modal.js';

export class PopUpRatingModal extends PopUpModal {
  ratingNumberRef;
  starsListRef;
  allStarsRef;
  emailRef;
  formRef;
  recipeId;

  constructor(id) {
    super({
      openModalSelector: '[data-pop-up-rating-open]',
      closeModalSelector: '[data-pop-up-rating-close]',
      backdropSelector: '[data-pop-up-rating-modal]',
    });

    this.ratingURL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
    this.recipeId = id;
    this.ratingNumberRef = document.querySelector('.pop-up-rating-number');
    this.starsListRef = document.querySelector('.pop-up-rating-list');
    this.allStarsRef = document.querySelectorAll('.pop-up-rating-item-icon');
    this.formRef = document.querySelector('.rating-form');
    this.init();
  }

  init() {
    this.formRef.addEventListener('submit', this.onRatingFormSubmit);
    this.starsListRef.addEventListener('click', this.onStarRatingClick);
  }

  onStarRatingClick = ({ target }) => {
    const iconRef = target.closest('.pop-up-rating-item-icon');
    if (!iconRef) {
      return;
    }

    const ratingStar = iconRef.dataset.rating;
    this.fillRatingInformation(ratingStar);
  };

  fillRatingInformation(rating) {
    this.ratingNumberRef.textContent = `${rating}.0`;

    this.unFillRatingStars();

    for (let i = 0; i < rating; i++) {
      this.allStarsRef[i].classList.add('filled');
    }
  }

  unFillRatingStars() {
    for (let i = 0; i < 5; i++) {
      this.allStarsRef[i].classList.remove('filled');
    }
  }

  onRatingFormSubmit = e => {
    e.preventDefault();
    this.emailRef = e.target.elements.email;

    const ratingValue = this.ratingNumberRef.textContent[0];
    const emailValue = this.emailRef.value;

    const data = {
      rate: Number(ratingValue),
      email: emailValue,
    };

    this.patchData(data);
    this.removeEventListeners();
    this.clearRatingIntormation();
    this.onCloseModal();
  };

  async patchData(data) {
    try {
      const res = await axios.patch(
        `${this.ratingURL}/${this.recipeId}/rating`,
        data
      );

      Notiflix.Notify.success('Thank you for your opinion');
    } catch (e) {
      const status = e.response.status;

      if (status === 400) {
        Notiflix.Notify.failure('Entered an invalid email');
      } else if (status === 409) {
        Notiflix.Notify.failure('You have already rated');
      } else {
        Notiflix.Notify.failure('Something went wrong');
      }
    }
  }

  removeEventListeners() {
    this.formRef.removeEventListener('submit', this.onRatingFormSubmit);
    this.starsListRef.removeEventListener('click', this.onStarRatingClick);
  }

  clearRatingIntormation() {
    this.ratingNumberRef.textContent = `0.0`;
    this.unFillRatingStars();
    this.emailRef.value = '';
  }
}
