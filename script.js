/* 1. EN-TÊTE : réduit au défilement */
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* 2. MENU HAMBURGER */
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");

function setMenu(open) {
    navigation.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    menuToggle.textContent = open ? "✕" : "☰";
}

menuToggle.addEventListener("click", () => setMenu(!navigation.classList.contains("open")));
navigation.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => { if (!header.contains(e.target)) setMenu(false); });

/* 3. ANNÉE AUTOMATIQUE */
document.querySelectorAll(".current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
});

/* 4. FORMULAIRE → WHATSAPP */
// Numéro ivoirien au format international, sans +, espace ni tiret.
const WHATSAPP_NUMBER = "2250564661552";

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!contactForm.reportValidity()) return;

        const data = new FormData(contactForm);
        const get = (key) => String(data.get(key) || "").trim();
        const name = get("name");
        const email = get("email");
        const project = get("project");
        const budget = get("budget") || "À discuter";
        const message = get("message");

        // Les champs remplis uniquement avec des espaces passent la validation HTML.
        if (name.length < 2 || message.length < 10) {
            formStatus.textContent = "Vérifiez les champs : le nom ou le message est trop court.";
            return;
        }

        const text = `Bonjour ARCHITECT-01 !

Je souhaite discuter d'un projet.

Nom : ${name}
E-mail : ${email}
Type de projet : ${project}
Budget indicatif : ${budget}

Description de mon projet :
${message}

Merci !`;

        formStatus.textContent = "Ouverture de WhatsApp...";
        window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    });
}
