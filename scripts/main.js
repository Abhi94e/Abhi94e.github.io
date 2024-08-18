document.querySelector('.scroll-down a').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#target-section').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.experience-item').forEach(item => {
    item.querySelector('.experience-header').addEventListener('click', () => {
        const details = item.querySelector('.experience-details');
        const isVisible = details.style.display === 'block';

        // Fermer toutes les sections ouvertes sauf celle qui est cliquée si elle n'est pas déjà ouverte
        document.querySelectorAll('.experience-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.experience-details').style.display = 'none';
                otherItem.querySelector('.toggle-details').textContent = '+';
            }
        });

        // Basculer l'affichage de la section cliquée
        if (isVisible) {
            details.style.display = 'none';
            item.classList.remove('active');
            item.querySelector('.toggle-details').textContent = '+';
        } else {
            details.style.display = 'block';
            item.classList.add('active');
            item.querySelector('.toggle-details').textContent = '–';
        }
    });
});

let lastScrollTop = 0;
const expertiseSection = document.querySelector('#expertise');

if (expertiseSection) {
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let expertiseTop = expertiseSection.getBoundingClientRect().top;

        if (expertiseTop <= 0 || scrollTop < lastScrollTop) {
            header.style.transform = 'translateY(0)';
        } else {
            header.style.transform = 'translateY(-100%)';
        }

        lastScrollTop = scrollTop;
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Arrête d'observer l'élément une fois animé
            }
        });
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelectorAll('.card').forEach((card, index) => {
    card.addEventListener('click', () => {
        let url;
        switch (index) {
            case 0:
                url = "todolist.html";
                break;
            case 1:
                url = "jeux.html";
                break;
            case 2:
                url = "huffman.html";
                break;
            default:
                url = "#"; // Fallback URL
        }
        window.location.href = url;
    });
});

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const projectID = card.getAttribute('data-project');
        projects.forEach(project => {
            project.classList.remove('active');
            if (project.id === projectID) {
                project.classList.add('active');
            }
        });
        popup.style.display = 'flex';
    });
});

const burgerMenuButton = document.querySelector('.burger-menu-button');
const burgerMenuButtonIcon = document.querySelector('.burger-menu-button i');
const burgerMenu = document.querySelector('.burger-menu');
const links = document.querySelectorAll('.burger-menu .links a');

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    burgerMenu.classList.toggle('burger-menu-open');
    const isOpen = burgerMenu.classList.contains('burger-menu-open');
    burgerMenuButtonIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

// Ferme le menu quand on clique sur un lien
links.forEach(link => {
    link.addEventListener('click', function() {
        burgerMenu.classList.remove('burger-menu-open');
        burgerMenuButtonIcon.classList = 'fa-solid fa-bars';
    });
});

// Ferme le menu quand on clique en dehors du menu
document.addEventListener('click', function(event) {
    if (!burgerMenu.contains(event.target) && !burgerMenuButton.contains(event.target)) {
        burgerMenu.classList.remove('burger-menu-open');
        burgerMenuButtonIcon.classList = 'fa-solid fa-bars';
    }
});

// Attache l'événement click au bouton du menu
burgerMenuButton.onclick = toggleMenu;