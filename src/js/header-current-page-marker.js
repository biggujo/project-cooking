export function highlightCurrentPage() {
  const { pathname } = window.location;

  // ! Development
  // const path = pathname === '/' ? '/index.html' : pathname;

  // ! Production
  let path;
  if (pathname.includes("index.html")) {
    path = "/index.html";
  } else if (pathname.includes("favorites.html")) {
    path = "/favorites.html";
  }

  // querySelectorAll because there are two references (PC & mobile modal)
  const links = document.querySelectorAll(
    `.modal-item-list > a[href=".${path}"`
  );

  links.forEach(link => {
    link.classList.add('current-page');
  });
}
