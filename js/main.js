// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form — basic client-side feedback (wire up to a backend/Formspree later)
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.textContent = "Sending…";

    // Simulate send — replace this with fetch() to your form endpoint
    setTimeout(() => {
      status.textContent = "Message sent! I'll be in touch soon.";
      form.reset();
      btn.disabled = false;
      btn.textContent = "Send Message";
    }, 1000);
  });
}

// ── 3D Models carousel ───────────────────────────────────────
// Add one filename per screenshot you save into projects/3d-models/.
// The carousel section stays hidden until this list has at least one entry.
const MODELS = [
  "Herman_miller_embody_arm.png",
  "ikea_pegboard_dewalt.png",
  // "gear-assembly.png",
  // "phone-stand.png",
];

const SECONDS_PER_SLIDE = 10;

const carousel = document.getElementById("modelCarousel");
if (carousel) {
  const section = document.getElementById("modelsSection");
  const track = document.getElementById("carouselTrack");

  if (MODELS.length === 0) {
    // Nothing to show yet — leave the whole section hidden.
    if (section) section.style.display = "none";
  } else {
    // Build a slide per screenshot.
    MODELS.forEach((file, i) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      const inner = document.createElement("div");
      inner.className = "slide-inner";
      const img = document.createElement("img");
      img.src = "projects/3d-models/" + file;
      img.alt = "3D model " + (i + 1);
      img.loading = "lazy";
      inner.appendChild(img);
      slide.appendChild(inner);
      track.appendChild(slide);
    });

    const slides = Array.from(track.children);
    let index = 0;
    let timer = null;

    // Slide the track so the active slide sits dead center, and flag it active.
    function center() {
      slides.forEach((s) => s.classList.remove("is-active"));
      const active = slides[index];
      active.classList.add("is-active");
      const offset =
        carousel.clientWidth / 2 - (active.offsetLeft + active.offsetWidth / 2);
      track.style.transform = "translateX(" + offset + "px)";
    }

    function next() {
      index = (index + 1) % slides.length;
      center();
    }

    function start() {
      stop();
      if (slides.length > 1) {
        timer = setInterval(next, SECONDS_PER_SLIDE * 1000);
      }
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    section.style.display = "block";
    // Position without animating on first paint.
    const prevTransition = track.style.transition;
    track.style.transition = "none";
    center();
    // Force reflow, then restore the animated transitions.
    void track.offsetWidth;
    track.style.transition = prevTransition;

    window.addEventListener("resize", center);
    // Let visitors linger on an image without it advancing out from under them.
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);

    start();
  }
}
