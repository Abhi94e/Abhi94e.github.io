/*const toggle = document.getElementById('toggleDark')
const body = document.querySelector('body')
const nav = document.querySelector('nav')
const navLinks = document.querySelectorAll('nav ul li a')

toggle.addEventListener('click', function () {
    this.classList.toggle('bi-moon')
    if (this.classList.toggle('bi-brightness-high-fill')) {
        body.style.background = '#fdfdfd60'
        body.style.color = '#161616e3'
        body.style.transition = '2s'
        nav.style.background = 'white'
        nav.style.borderColor = '#3b3b3b'
        nav.style.color = '#161616e3'
        nav.style.transition = '2s'
        navLinks.forEach(link => {
            link.style.color = '#161616e3'
            link.addEventListener('mouseover', () => link.style.color = 'aqua')
            link.addEventListener('mouseout', () => link.style.color = '#161616e3')
        });
        navLinks.forEach(link => link.style.transition = '2s')
    } else {
        body.style.background = '#1d1d1d'
        body.style.color = '#e7e7e7f3'
        body.style.transition = '2s'
        nav.style.background = '#3c3c3c'
        nav.style.borderColor = '#a0a0a0'
        nav.style.color = '#e7e7e7f3'
        nav.style.transition = '2s'
        navLinks.forEach(link => {
            link.style.color = '#e7e7e7f3'; // Appliquer le style à tous les liens
            link.addEventListener('mouseover', () => link.style.color = 'aqua') // Changer la couleur en aqua au survol
            link.addEventListener('mouseout', () => link.style.color = '#e7e7e7f3') // Revenir à la couleur blanche quand la souris quitte
        });
        navLinks.forEach(link => link.style.transition = '2s')
    }
});*/
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById('toggleDark')
    const body = document.querySelector('body')
    const nav = document.querySelector('nav')
    const navLinks = document.querySelectorAll('nav ul li a')
    const icon = document.querySelectorAll('.skills-icons, .path')
    
    function applyDarkTheme() {
        body.style.background = '#1d1d1d'
        body.style.color = '#e7e7e7f3'
        nav.style.background = '#3c3c3c'
        nav.style.borderColor = '#a0a0a0'
        nav.style.color = '#e7e7e7f3'
        icon.forEach(ico => {
            ico.style.filter = 'invert(100%)'
        })
        navLinks.forEach(link => {
            link.style.color = '#e7e7e7f3'
            link.addEventListener('mouseover', () => link.style.color = 'aqua')
            link.addEventListener('mouseout', () => link.style.color = '#e7e7e7f3')
        });
        toggle.classList.remove('bi-brightness-high-fill')
        toggle.classList.add('bi-moon')
    }

    function applyLightTheme() {
        body.style.background = '#fdfdfd60'
        body.style.color = '#161616e3'
        nav.style.background = 'white'
        nav.style.borderColor = '#3b3b3b'
        nav.style.color = '#161616e3'
        icon.forEach(ico => {
            ico.style.filter = 'invert(0%)'
        })
        navLinks.forEach(link => {
            link.style.color = '#161616e3'
            link.addEventListener('mouseover', () => link.style.color = 'aqua')
            link.addEventListener('mouseout', () => link.style.color = '#161616e3')
        });
        toggle.classList.remove('bi-moon')
        toggle.classList.add('bi-brightness-high-fill')
    }

    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
        applyDarkTheme()
    } else {
        applyLightTheme()
    }

    toggle.addEventListener('click', function () {
        if (body.style.background === 'rgb(29, 29, 29)') {
            applyLightTheme()

            localStorage.setItem('theme', 'light')
        } else {
            applyDarkTheme()
            localStorage.setItem('theme', 'dark')
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".smooth-scroll")

    for (const link of links) {
        link.addEventListener("click", function (event) {
            event.preventDefault()

            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            })
        })
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll('.project')
    projects.forEach(project => {
        project.addEventListener('click', function () {
            const href = this.getAttribute('data-href')
            if (href) {
                window.location.href = href
            }
        });

        const links = project.querySelectorAll('a')
        links.forEach(link => {
            link.addEventListener('click', function (event) {
                event.stopPropagation()
            })
        })
    })
})

/*const profilePhoto = document.getElementById('profile-photo')
window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY
    const maxScroll = 200 
    const minSize = 100 

    if (scrollPosition <= maxScroll) {
        const newSize = 200 - (scrollPosition / maxScroll * 100)
        profilePhoto.style.height = `${newSize}px`
        profilePhoto.style.width = `${newSize}px`
    } else {
        profilePhoto.style.height = `${minSize}px`
        profilePhoto.style.width = `${minSize}px`
    }
})*/

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.animate([
                { opacity: 0 },
                { opacity: 1 }
            ], {
                duration: 700
            });
        }
    }
});


const allTargets = [
    ...document.querySelectorAll('.skills-category'),
    ...document.querySelectorAll('.project'),
    document.getElementById('skills'),
    document.getElementById('proCv'),
    document.getElementById('projects'),
    document.getElementById('home'),
    document.getElementById('contact')
]

allTargets.forEach((target) => {
    if (target) { 
        observer.observe(target)
    }
})
