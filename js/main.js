/* =========================
   PCA PÁDEL CLUB - MAIN JS
========================= */

document.addEventListener("DOMContentLoaded", () => {
    initAOS();
    initMobileMenu();
    initHeroSlider();
    initCounters();
    initMap();
    initSmoothScroll();
    initNavScroll();
    initContactForm();
});


/* =========================
   AOS ANIMATIONS
========================= */

function initAOS() {
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true,
            offset: 90,
            easing: "ease-out-cubic"
        });
    }
}


/* =========================
   MENÚ MÓVIL
========================= */

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const body = document.body;

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        body.classList.toggle("menu-open", isOpen);
        menuToggle.classList.toggle("active", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            body.classList.remove("menu-open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            navLinks.classList.remove("active");
            body.classList.remove("menu-open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


/* =========================
   HERO SLIDER
========================= */

function initHeroSlider() {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) return;

    let currentSlide = 0;

    setInterval(() => {
        slides[currentSlide].classList.remove("active");

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add("active");
    }, 5200);
}


/* =========================
   CONTADORES ANIMADOS
========================= */

function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    const animateCounter = counter => {
        const target = Number(counter.dataset.target || 0);
        const duration = 1400;
        const startTime = performance.now();

        const update = currentTime => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(easedProgress * target);

            counter.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;

            if (counter.dataset.animated === "true") return;

            counter.dataset.animated = "true";
            animateCounter(counter);
            observer.unobserve(counter);
        });
    }, {
        threshold: 0.45
    });

    counters.forEach(counter => observer.observe(counter));
}


/* =========================
   MAPA LEAFLET
========================= */

function initMap() {
    const mapElement = document.getElementById("map");

    if (!mapElement || typeof L === "undefined") return;

    const coords = [40.3008, -3.4380];

    const map = L.map(mapElement, {
        scrollWheelZoom: false
    }).setView(coords, 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    L.marker(coords)
        .addTo(map)
        .bindPopup("<strong>PCA Pádel Club Arganda</strong><br>Instalaciones municipales de Arganda del Rey")
        .openPopup();
}


/* =========================
   SCROLL SUAVE
========================= */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const href = anchor.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}


/* =========================
   NAV AL HACER SCROLL
========================= */

function initNavScroll() {

    const nav = document.querySelector(".nav");

    if (!nav) return;

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const updateNav = () => {

        nav.classList.toggle("scrolled", window.scrollY > 80);

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    updateNav();

    window.addEventListener("scroll", updateNav, {
        passive: true
    });

}


/* =========================
   FORMULARIO DE CONTACTO
========================= */

function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(form);

        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !email || !message) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const subject = encodeURIComponent(`Contacto web PCA - ${name}`);
        const body = encodeURIComponent(
            `Nombre: ${name}\n` +
            `Email: ${email}\n\n` +
            `Mensaje:\n${message}`
        );

        // Cambia este correo por el real del club
        const clubEmail = "padelclubarganda@gmail.com";

        window.location.href = `mailto:${clubEmail}?subject=${subject}&body=${body}`;
    });
}
