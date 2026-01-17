// Eaz Nexora Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    console.log("Eaz Nexora Landing Page Loaded");

    // Add sticky navbar effect if needed
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });
});