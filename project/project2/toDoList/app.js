import { fetchJSON } from "./functions/api.js"
import { createElement } from "./functions/dom.js"
import { TodoList } from "./components/TodoList.js"

try {
    const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const list = new TodoList(todos)
    // Crée une instance de TodoList avec les tâches récupérées
    list.appendTo(document.querySelector('#todolist'))
    // Ajoute la TodoList à l'élément HTML avec l'ID 'todolist'
} catch (e) {
     // En cas d'erreur, affiche un message d'alerte
    const AlertElement = createElement('div', {
        class: 'alert alert-danger m-2',
        role: 'alert'
    })
    AlertElement.innerText = 'Impossible de charger les éléments'
    document.body.prepend(AlertElement)
    console.error(e)
}