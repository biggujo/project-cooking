const body = document.querySelector('body');
const themeToggleBtns = document.querySelectorAll('.switch-input');

function toggleTheme() {
  body.classList.toggle('dark-theme');

  const isDarkTheme = JSON.parse(localStorage.getItem('darkTheme'));
  localStorage.setItem('darkTheme', !isDarkTheme);
}

const isDarkTheme = JSON.parse(localStorage.getItem('darkTheme'));

if (isDarkTheme) {
  body.classList.add('dark-theme');
  themeToggleBtns.forEach(themeToggleBtn => (themeToggleBtn.checked = true));
}

themeToggleBtns.forEach(themeToggleBtn =>
  themeToggleBtn.addEventListener('click', toggleTheme)
);
