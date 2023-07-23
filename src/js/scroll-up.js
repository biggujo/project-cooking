export function scrollFunc() {
  window.onscroll = function () {
    scrollFunction();
  };
}
function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById('roll_back').style.display = 'flex';
  } else {
    document.getElementById('roll_back').style.display = 'none';
  }
}
