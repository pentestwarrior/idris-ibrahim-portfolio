// Smooth scroll
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

// Typing effect
const text = "Cybersecurity Practitioner • Educator • Ethical Hacker";
let index = 0;
function type() {
    if (index < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 80);
    }
}
type();

// Click-to-view certificates
document.querySelectorAll(".cert-img").forEach(img => {
    img.addEventListener("click", () => {
        window.open(img.src, "_blank");
    });
});
