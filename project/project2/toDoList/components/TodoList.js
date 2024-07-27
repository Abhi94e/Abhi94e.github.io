/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
import { createElement } from "../functions/dom.js"

export class TodoList {
    #todos = []; // Déclaration du champ privé
    #listElement = []; // Déclaration du champ privé

    /**
     * Constructeur de la classe TodoList.
     * @param {Todo[]} todos - Liste des tâches.
     */
    constructor(todos) {
        this.#todos = todos
    }
    /**
     * Ajoute la TodoList à un élément HTML spécifié.
     * @param {HTMLElement} element - L'élément HTML auquel ajouter la TodoList.
     */
    appendTo(element) {
        element.innerHTML = `<form class="d-flex pb-4">
            <input required="" class="form-control" type="text" placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes">
            <button class="btn btn-primary">Ajouter</button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group">
                <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
            </div>

            <ul class="list-group">
            </ul>
        </main>`
        this.#listElement = element.querySelector('.list-group')
        for (let todo of this.#todos) {
            const t = new TodoListItem(todo)
            this.#listElement.append(t.element)
        }

        element.querySelector('form').addEventListener('submit', e => this.#onSubmit(e))
        element.querySelectorAll('.btn-group button').forEach(button => {
            button.addEventListener('click', e => this.#toggleFilter(e))
        });
    }
      /**
     * Gère la soumission du formulaire pour ajouter une nouvelle tâche.
     * @param {Event} e - L'événement de soumission du formulaire.
     */
    #onSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(e.currentTarget).get('title').toString().trim()
        if(title === '') {
            return
        }
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        form.reset()
    }

    /**
     * Gère le filtrage des tâches en fonction de leur état (toutes, à faire, faites).
     * @param {Event} e - L'événement de clic sur un bouton de filtre.
     */
    #toggleFilter (e) {
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')
        if (filter === 'todo') {
            this.#listElement.classList.add('hide-completed')
            this.#listElement.classList.remove('hide-todo')
        } else if (filter === 'done') {
            this.#listElement.classList.add('hide-todo')
            this.#listElement.classList.remove('hide-completed')
        } else {
            this.#listElement.classList.remove('hide-todo')
            this.#listElement.classList.remove('hide-completed')
        }
    }
}

class TodoListItem {

    #element
    /**
     * Constructeur de la classe TodoListItem.
     * @param {Todo} todo - La tâche représentée par cet élément.
     */

    constructor(todo) {
        const id = `todo-${todo.id}`
        const li = createElement('li', {
            class: 'todo list-group-item d-flex align-items-center'
        })
        this.#element = li
        const checkbox = createElement('input', {
            type: 'checkbox',
            class: 'form-check-input',
            type: 'checkbox',
            id,
            checked: todo.completed ? '' : null
        })
        li.append(checkbox)
        const label = createElement('label', {
            class: 'ms-2 form-check-label',
            for: 'id'
        })
        label.innerText = todo.title
        li.append(label)
        const button = createElement('button', {
            class: 'ms-auto btn btn-danger btn-sm'
        })
        button.innerHTML = '<i class="bi-trash"></i>'
        li.append(checkbox)
        li.append(label)
        li.append(button)
        this.toggle(checkbox)

        button.addEventListener('click', e => this.remove(e))
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))

    
    }
    /**
     * Obtient l'élément HTML représentant la tâche.
     * @returns {HTMLElement} - L'élément HTML de la tâche.
     */
    get element () {
        return this.#element
    }
    
    /**
     * Supprime l'élément de la tâche du DOM.
     * @param {Event} e - L'événement de clic sur le bouton de suppression.
     */
    remove(e) {
        e.preventDefault()
        this.#element.remove()
    }
    
    /**
     * Bascule l'état de la tâche (complétée ou non).
     * @param {HTMLInputElement} checkbox - La case à cocher associée à la tâche.
     */

    toggle (checkbox) {
        if(checkbox.checked) {
            this.#element.classList.add('is-completed')
        } else {
            this.#element.classList.remove('is-completed')
        }
    }
}