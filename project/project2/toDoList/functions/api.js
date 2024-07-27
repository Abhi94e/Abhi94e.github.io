/**
 * Effectue une requête HTTP et retourne la réponse en JSON.
 * @param {string} url - L'URL à laquelle faire la requête.
 * @param {object} options - Les options pour la requête.
 * @returns {Promise<object>} - La réponse en JSON.
 */
export async function fetchJSON (url, options= {}) {
    const headers = {Accept : 'application/js', ...options.headers}
    const r = await fetch(url, {...options, headers})
    if (r.ok) {
        return r.json()
    }
    throw new Error('Erreur serveur', {cause: r})
}