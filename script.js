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
const factTitle = document.getElementById('fact-title');
const factDesc = document.getElementById('fact-desc');
const factCounter = document.getElementById('fact-counter');
const frontClickHint = document.getElementById('front-click-hint');
const cardBackBg = document.getElementById('card-back-bg');

const mexicoFacts = [
    {
        title: "Chichén Itzá",
        desc: "Built by the Maya civilization, this ancient city is one of the <strong>New Seven Wonders of the World</strong>.",
        bg: "linear-gradient(135deg, #006847 0%, #004d35 100%)"
    },
    {
        title: "UNESCO Heritage",
        desc: "Mexico is home to <strong>35 UNESCO World Heritage sites</strong>, showcasing its rich history and nature.",
        bg: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)"
    },
    {
        title: "Built on Ruins",
        desc: "<strong>Mexico City</strong> was built over the ruins of the ancient Aztec capital, Tenochtitlán.",
        bg: "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)"
    },
    {
        title: "Avocado Capital",
        desc: "Mexico is by far the <strong>largest producer of avocados</strong> in the entire world.",
        bg: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)"
    },
    {
        title: "Birthplace of Chocolate",
        desc: "Chocolate was first discovered and consumed by the ancient <strong>Maya and Aztec</strong> civilizations.",
        bg: "linear-gradient(135deg, #3e5151 0%, #decba4 100%)"
    },
    {
        title: "Educational Giant",
        desc: "The National Autonomous University of Mexico (<strong>UNAM</strong>) is one of the largest universities in Latin America.",
        bg: "linear-gradient(135deg, #141e30 0%, #243b55 100%)"
    },
    {
        title: "Incredible Biodiversity",
        desc: "Mexico possesses one of the <strong>highest levels of biodiversity</strong> of any country on the planet.",
        bg: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)"
    },
    {
        title: "Linguistic Diversity",
        desc: "The country has <strong>over 60 indigenous languages</strong> that are officially recognized by the government.",
        bg: "linear-gradient(135deg, #ff4e50 0%, #f9d423 100%)"
    },
    {
        title: "The Largest Pyramid",
        desc: "Mexico is home to the <strong>largest pyramid in the world by volume</strong>: the Great Pyramid of Cholula.",
        bg: "linear-gradient(135deg, #b06ab3 0%, #4568dc 100%)"
    }
];

let currentFactIndex = 0;
let isFlipping = false;

if(flipCard) {
    // Initial BG setup to ensure it matches the first fact visually on load
    if(cardBackBg) cardBackBg.style.backgroundImage = mexicoFacts[0].bg;

    flipCard.addEventListener('click', function() {
        if(isFlipping) return;
        isFlipping = true;
        
        const isCurrentlyFlipped = this.classList.contains('flipped');
        
        if (isCurrentlyFlipped) {
            // Flipping back to front
            this.classList.remove('flipped');
            frontClickHint.textContent = "Click for next fact!";
            
            // Wait for flip halfway to change content secretly
            setTimeout(() => {
                currentFactIndex = (currentFactIndex + 1) % mexicoFacts.length;
                factTitle.innerHTML = mexicoFacts[currentFactIndex].title;
                factDesc.innerHTML = mexicoFacts[currentFactIndex].desc;
                if(factCounter) factCounter.innerHTML = `Fact ${currentFactIndex + 1} of ${mexicoFacts.length}`;
                if(cardBackBg) cardBackBg.style.backgroundImage = mexicoFacts[currentFactIndex].bg;
                
                isFlipping = false;
            }, 400); // 400ms matches halfway point of 0.8s CSS transition
        } else {
            // Flipping to back
            this.classList.add('flipped');
            setTimeout(() => {
                isFlipping = false;
            }, 800);
        }
    });
}

// Culture Section Interactive Badges
const cultureBadges = document.querySelectorAll('.culture-badge');
const cultureFeature = document.getElementById('culture-feature');
const cultureTitle = document.getElementById('culture-title');
const cultureDesc = document.getElementById('culture-desc');

if (cultureBadges.length > 0) {
    cultureBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const icon = this.getAttribute('data-icon');
            const desc = this.getAttribute('data-desc');
            
            // Highlight the selected badge visually
            cultureBadges.forEach(b => {
                b.style.background = 'rgba(255,255,255,0.1)';
                b.style.transform = 'translateY(0)';
            });
            
            this.style.background = 'var(--mexico-red)';
            this.style.transform = 'translateY(-3px)';
            
            // Change content with a fade effect
            if(cultureFeature) cultureFeature.style.opacity = '0';
            setTimeout(() => {
                if(cultureTitle) cultureTitle.innerHTML = `<i class="fas ${icon}"></i> ${title}`;
                if(cultureDesc) cultureDesc.innerHTML = desc;
                if(cultureFeature) cultureFeature.style.opacity = '1';
            }, 300);
        });
    });
}
