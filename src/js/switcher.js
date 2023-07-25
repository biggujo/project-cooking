function toggleTheme() {
  const body = document.querySelector('body');
  body.classList.toggle('dark-theme');

  const isDarkTheme = !body.classList.contains('dark-theme');
  localStorage.setItem('darkTheme', isDarkTheme);
}

const themeToggleBtn = document.querySelector('.switch-input');
themeToggleBtn.addEventListener('click', toggleTheme);

const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
if (isDarkTheme) {
  const body = document.querySelector('body');
  body.classList.add('dark-theme');
}
