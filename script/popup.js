document.addEventListener('DOMContentLoaded', () => {
    initAddEventListenerPopup()
});

function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    popupBackground.classList.add("active")
}

function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    popupBackground.classList.remove("active")
}

function initAddEventListenerPopup() {
    let btnOpenPopup = document.getElementById("openPopup")
    let btnEnvoyerMail = document.getElementById("btnEnvoyerMail")
    let popupBackground = document.querySelector(".popupBackground")

    btnOpenPopup.addEventListener("click", () => {
        afficherPopup()
    });

    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            cacherPopup()
        }
    });

    btnEnvoyerMail.addEventListener("click", () => {
        let nom = document.getElementById("nom").value.trim()
        let message = document.getElementById("message").value.trim()
        let errorMessage = document.getElementById("error-message")

        if (!nom || !message) {
            errorMessage.textContent = "Tous les champs sont obligatoires."
            return;
        }

        if (nom.length < 1) {
            errorMessage.textContent = "Le nom doit comporter au moins 1 caractère."
            return;
        }

        if (message.length < 20) {
            errorMessage.textContent = "Le message doit comporter au moins 20 caractères."
            return;
        }

        let mailtoLink = `mailto:ihab.bourgi944@gmail.com?subject=Contact%20de%20${encodeURIComponent(nom)}&body=${encodeURIComponent(message)}`
        window.location.href = mailtoLink;
    });
}