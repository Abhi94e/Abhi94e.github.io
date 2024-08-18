/**
 * Crée un élément HTML avec les attributs spécifiés.
 * @param {string} tagName - Le nom de la balise HTML.
 * @param {object} attributes - Les attributs à ajouter à l'élément.
 * @returns {HTMLElement} - L'élément HTML créé.
 */

export function createElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        if (value !== null) {
        element.setAttribute(attribute, value)
    }
    }
    return element
}