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
  "microphone_screw_replacement.png",
  // "phone-stand.png",
];

const SECONDS_PER_SLIDE = 10;

const carousel = document.getElementById("modelCarousel");
if (carousel) {
  const section = document.getElementById("modelsSection");
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  if (MODELS.length === 0) {
    // Nothing to show yet — leave the whole section hidden.
    if (section) section.style.display = "none";
  } else {
    // Build a slide per screenshot.
    const slides = MODELS.map((file, i) => {
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
      slide._r = 0; // last relative position, used to detect wrap-arounds
      track.appendChild(slide);
      return slide;
    });

    const n = slides.length;
    let index = 0;
    let timer = null;
    let spacing = computeSpacing();

    // Distance between adjacent slide centers; tightened on narrow screens.
    function computeSpacing() {
      return Math.min(300, Math.round(window.innerWidth * 0.72));
    }

    // Shortest signed offset of slide i from the active one, so the strip
    // wraps: e.g. with 3 slides, the first sits just right of the last.
    function wrapR(r) {
      r = ((r % n) + n) % n; // 0..n-1
      if (r > n / 2) r -= n; // move the far half to the negative (left) side
      return r;
    }

    // Place every slide relative to the active index.
    function layout(animate) {
      slides.forEach((slide, i) => {
        const r = wrapR(i - index);
        const absr = Math.abs(r);

        // Target visual state for this position.
        const scale = absr < 0.5 ? 1.12 : absr < 1.5 ? 0.72 : 0.5;
        const opacity = absr < 0.5 ? 1 : absr < 1.5 ? 0.55 : 0;
        const z = absr < 0.5 ? 30 : absr < 1.5 ? 20 : 10;
        const transform =
          "translate(-50%, -50%) translateX(" +
          r * spacing +
          "px) scale(" +
          scale +
          ")";

        // Did this slide cross the seam (jump to the opposite side)?
        const wrap = Math.abs(r - slide._r) > 1.5;
        slide._r = r;
        slide.style.zIndex = z;
        slide.classList.toggle("is-active", absr < 0.5);

        if (animate && wrap) {
          // Teleport into position while invisible, then fade in on the new
          // side — avoids a "pop" sliding across the whole carousel.
          slide.style.transition = "none";
          slide.style.transform = transform;
          slide.style.opacity = 0;
          void slide.offsetWidth; // flush the instant move
          requestAnimationFrame(() => {
            slide.style.transition = "";
            slide.style.opacity = opacity;
          });
        } else if (!animate) {
          // Initial placement — snap, no animation.
          slide.style.transition = "none";
          slide.style.transform = transform;
          slide.style.opacity = opacity;
          void slide.offsetWidth;
        } else {
          // Normal neighbour move — slide smoothly.
          slide.style.transition = "";
          slide.style.transform = transform;
          slide.style.opacity = opacity;
        }
      });
    }

    function go(newIndex) {
      index = ((newIndex % n) + n) % n;
      layout(true);
    }

    function next() {
      go(index + 1);
    }
    function prev() {
      go(index - 1);
    }

    function start() {
      stop();
      if (n > 1) timer = setInterval(next, SECONDS_PER_SLIDE * 1000);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    section.style.display = "block";
    layout(false); // initial placement, no animation

    // Arrows: step one image and restart the dwell timer so the manual pick
    // gets its full viewing time.
    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        prev();
        start();
      });
    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        next();
        start();
      });

    window.addEventListener("resize", () => {
      spacing = computeSpacing();
      layout(false);
    });

    // Let visitors linger on an image without it advancing out from under them.
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);

    start();
  }
}
