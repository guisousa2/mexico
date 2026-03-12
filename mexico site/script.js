// Navigation Bar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Intersection Observer)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// Food Section Interactive Hotspots
const hotspots = document.querySelectorAll('.food-hotspot');
const infoPanel = document.getElementById('food-info-panel');

const defaultInfoHTML = `
    <h3>Hover over the dots to explore!</h3>
    <p>Discover the secrets of Mexican flavor.</p>
`;

hotspots.forEach(spot => {
    spot.addEventListener('mouseenter', function() {
        const info = this.getAttribute('data-info');
        const splitInfo = info.split(':');
        
        if (splitInfo.length > 1) {
            infoPanel.innerHTML = `
                <h3>${splitInfo[0]}</h3>
                <p>${splitInfo[1].trim()}</p>
            `;
        } else {
            infoPanel.innerHTML = `<p>${info}</p>`;
        }
        infoPanel.style.transform = 'scale(1.05)';
        infoPanel.style.borderTopColor = 'var(--mexico-red)';
    });
    
    spot.addEventListener('mouseleave', function() {
        infoPanel.style.transform = 'scale(1)';
        infoPanel.style.borderTopColor = 'var(--mexico-green)';
        // infoPanel.innerHTML = defaultInfoHTML; // Decided to let the last hovered item stay visible for better UX
    });
});

// Curiosity Card Flip
const flipCard = document.getElementById('did-you-know-card');
if(flipCard) {
    flipCard.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
}
