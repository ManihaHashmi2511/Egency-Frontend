export function typewriter(selector, words, speed = 100) {
  const el = document.querySelector(selector);
  let i = 0, j = 0, deleting = false;

   setInterval(() => {
    el.textContent = words[i].slice(0, j);
    if (!deleting) {
      j < words[i].length ? j++ : setTimeout(() => deleting = true, 3000);
    } else {
      j > 0 ? j-- : (deleting = false, i = (i + 1) % words.length);
    }
  }, speed);
}