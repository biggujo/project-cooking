export function scrollFunc() {
  window.onscroll = function () {
    scrollFunction();
  };
}

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById('roll_back').classList.add('animate');
    document.getElementById('roll_back').classList.remove('animate-reverse');
  } else {
    document.getElementById('roll_back').classList.remove('animate-reverse');
    document.getElementById('roll_back').classList.add('animate-reverse');
  }
}
