(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-order-open]'),
    closeModalBtn: document.querySelector('[data-order-close]'),
    modal: document.querySelector('[data-order]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hiddens');
  }
})();

const form = document.getElementById('order-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  console.log('Name:', name);
  console.log('Phone number:', phone);
  console.log('Email:', email);
  console.log('Comment:', message);
});
