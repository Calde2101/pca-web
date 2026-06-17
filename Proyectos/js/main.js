/* =========================
   AOS ANIMATIONS
========================= */

AOS.init({
    duration: 1000,
    once: true
});


/* =========================
   COUNTERS ANIMADOS HERO
========================= */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    let target = +counter.getAttribute("data-target");
    let count = 0;
    let speed = target / 80;

    function update() {

        if (count < target) {
            count += speed;
            counter.innerText = Math.floor(count);
            requestAnimationFrame(update);
        } else {
            counter.innerText = target;
        }
    }

    update();
});


/* =========================
   HERO SLIDER (CINEMÁTICO)
========================= */

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changeSlide() {

    if (!slides.length) return;

    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");
}

setInterval(changeSlide, 5000);


/* =========================
   MAPA INTERACTIVO (LEAFLET)
========================= */

const map = L.map('map').setView([40.3008, -3.4380], 15);

// mapa base
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: ''
}).addTo(map);

// marcador PCA
L.marker([40.3008, -3.4380])
    .addTo(map)
    .bindPopup("PCA Pádel Club Arganda")
    .openPopup();


/* =========================
   SCROLL SUAVE EXTRA (NAV FIX)
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* =========================
   NAV BACKGROUND ON SCROLL
========================= */

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        nav.style.background = "rgba(0,0,0,0.85)";
        nav.style.backdropFilter = "blur(12px)";
    } else {
        nav.style.background = "rgba(0,0,0,0.5)";
    }
});