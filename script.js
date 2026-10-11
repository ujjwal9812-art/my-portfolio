/* Theme toggle (remembers the choice) */
const root = document.documentElement;
document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

/* Highlight the nav link of the section in view */
const navLinks = Array.from(document.querySelectorAll('.links a'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
navLinks.forEach((a) => {
  const section = document.querySelector(a.getAttribute('href'));
  if (section) observer.observe(section);
});

/* Gallery: click a photo to enlarge it */
const box = document.getElementById('lightbox');
const boxImg = document.getElementById('lb-img');
document.querySelectorAll('.gallery button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    boxImg.src = img.src;
    boxImg.alt = img.alt;
    box.showModal();
  });
});
document.getElementById('lb-close').addEventListener('click', () => box.close());
box.addEventListener('click', (e) => { if (e.target === box) box.close(); });

/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();
