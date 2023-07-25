export function highlightCurrentPage() {
  const { pathname } = window.location;

  const path = pathname === '/' ? '/index.html' : pathname;

  // querySelectorAll because there are two references (PC & mobile modal)
  const links = document.querySelectorAll(
    `.modal-item-list > a[href=".${path}"`
  );

  links.forEach(link => {
    link.classList.add('current-page');
  });
}
