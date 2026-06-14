// Set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form — basic client-side feedback (wire up to a backend/Formspree later)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Simulate send — replace this with fetch() to your form endpoint
    setTimeout(() => {
      status.textContent = 'Message sent! I\'ll be in touch soon.';
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1000);
  });
}
