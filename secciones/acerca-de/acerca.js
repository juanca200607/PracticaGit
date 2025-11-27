// Sección Acerca de – comportamiento opcional
document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector("#acerca-de");

    if (!aboutSection) return;

    // Animación de entrada cuando la sección es visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    
                    // Resaltar el enlace del menú si existe
                    const menuLink = document.querySelector('a[href="#acerca-de"]');
                    if (menuLink) {
                        menuLink.classList.add("is-active");
                    }
                } else {
                    const menuLink = document.querySelector('a[href="#acerca-de"]');
                    if (menuLink) {
                        menuLink.classList.remove("is-active");
                    }
                }
            });
        },
        { threshold: 0.3 }
    );

    // Efecto de entrada inicial
    aboutSection.style.opacity = "0";
    aboutSection.style.transform = "translateY(20px)";
    aboutSection.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(aboutSection);
});
