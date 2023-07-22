function addClassToElement() {
  const targetElements = document.querySelectorAll('.dark-site');
  const bodyElement = document.body;

  targetElements.forEach(element => {
    element.classList.toggle('theme-dark');
  });

  if (bodyElement) {
    bodyElement.classList.toggle('theme-dark');
  }
}

const addButton = document.querySelector('.switcher');
if (addButton) {
  addButton.addEventListener('click', addClassToElement);
}
