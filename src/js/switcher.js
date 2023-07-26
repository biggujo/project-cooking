// function toggleTheme() {
//   const body = document.querySelector('body');
//   body.classList.toggle('dark-theme');

//   const isDarkTheme = !body.classList.contains('dark-theme');
//   localStorage.setItem('darkTheme', isDarkTheme);
// }

// const themeToggleBtn = document.querySelector('.switch-input');
// themeToggleBtn.addEventListener('click', toggleTheme);

// const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
// if (isDarkTheme) {
//   const body = document.querySelector('body');
//   body.classList.add('dark-theme');
// }

// function toggleTheme() {
//   const body = document.querySelector('body');
//   body.classList.toggle('dark-theme');

//   const isDarkTheme = !body.classList.contains('dark-theme');
//   localStorage.setItem('darkTheme', isDarkTheme);
// }

// const themeToggleBtn = document.querySelector('.switch-input');
// themeToggleBtn.addEventListener('click', toggleTheme);

// const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
// if (isDarkTheme) {
//   const body = document.querySelector('body');
//   body.classList.add('dark-theme');
// }
const body = document.querySelector('body');
const themeToggleBtn = document.querySelector('.switch-input');

function toggleTheme() {
  body.classList.toggle('dark-theme');

  const isDarkTheme = JSON.parse(localStorage.getItem('darkTheme'));
  localStorage.setItem('darkTheme', !isDarkTheme);
}

const isDarkTheme = JSON.parse(localStorage.getItem('darkTheme'));

if (isDarkTheme) {
  body.classList.add('dark-theme');
  themeToggleBtn.checked = true;
}

themeToggleBtn.addEventListener('click', toggleTheme);
