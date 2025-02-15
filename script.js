// Funkcja do płynnego przewijania z kontrolowanym czasem trwania
function smoothScroll(target, duration, offset = 50) {
  const targetElement = document.querySelector(target);
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  // Funkcja easing (easeInOutQuad) – zapewnia płynny efekt animacji
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Przykładowe wywołanie – przewinięcie do sekcji #about w ciągu 2000ms z dodatkowym offsetem 50px
document.getElementById('scrollBtn').addEventListener('click', function(e) {
  e.preventDefault();
  smoothScroll('#about', 1000);
});