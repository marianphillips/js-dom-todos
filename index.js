const ulElement = document.querySelector('#todo-list')
const addTodoForm = document.querySelector('form')

function addTodo(todo) {
    const liElement = document.createElement('li')
    const completeButton = document.createElement('button')
    liElement.innerText = todo.title

    if(todo.completed === true) {
        liElement.style.color = "#D3D3D3"
        liElement.style.textDecoration = "line-through"
    }

    if(todo.completed === false) {
        completeButton.innerText = "Completed"
        completeButton.style.marginLeft = "10px"
        completeButton.style.fontSize = "10px"
        liElement.append(completeButton)

        completeButton.addEventListener('click', function() {
            fetch(`http://localhost:3000/todos/${todo.id}` , {
        method: "PATCH",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({completed: true})
        })
        .then(function(response) { return response.json()})
        .then(render())
        })
    }

    const deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    deleteButton.style.marginLeft = "10px"
    deleteButton.style.fontSize = "10px"

    deleteButton.addEventListener('click', function() {
        fetch(`http://localhost:3000/todos/${todo.id}` , {
    method: "DELETE"})
    .then(function(response) { return response.json()})
    .then(render())
    })
    
    liElement.append(deleteButton)
    ulElement.append(liElement)
}

function addTodos(todos) {
 todos.forEach(todo => addTodo(todo))
}

function render() {
    ulElement.innerHTML = ""
    fetch('http://localhost:3000/todos')
    .then(function(response) { return response.json()})
    .then(todos => addTodos(todos))

}

addTodoForm.addEventListener('submit', function(event) {
    const newTodo = {
    title: addTodoForm.title.value,
    completed: false
    }
    
    fetch('http://localhost:3000/todos' , {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
        })
    .then(function(response) { return response.json()})
    .then(todo => addTodo(todo))

    addTodoForm.reset()
})



render()

