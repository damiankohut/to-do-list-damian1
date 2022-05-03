/**
 * Your browser JS code will go here
 */
 fetch("http://localhost:3000/todos")
 .then(res => res.json())
 .then(data => {
   data.forEach(task => {
     renderTodo(task);
   })
 })

/**
* Select the Create ToDo Form and add a submit event listener to it
*/
document.querySelector("#create-todo-form").addEventListener('submit', createToDo)

/**
* Helper function to create a todo list element that you can easily append to DOM 
*/
function renderTodo(todo) {
 // create a list item element
 const listItem = document.createElement("li");
 // add the todo's id to the li so we can reference it later
 listItem.id = `todo-${todo.id}`;

 // create a paragraph element
 const description = document.createElement("p");
 // add the description to the paragraph element
 description.innerText = todo.description;
 // add the todo's id to the description so we can reference it later
 description.id = `description-${todo.id}`;

 // create a Mark complete button
 const markCompleteBtn = document.createElement("button");
 markCompleteBtn.innerText = "Mark Todo as Complete";
 // add the todo's id as a data attribute so we can reference later
 markCompleteBtn.dataset.todoId = todo.id;
 // add event listener
 markCompleteBtn.addEventListener("click", markComplete);

 // create a delete button El
 const deleteBtn = document.createElement("button");
 deleteBtn.innerText = "Delete"
 // add the todo's id as a data attribute so we can reference later
 deleteBtn.dataset.todoId = todo.id;
 // and and event listener
 deleteBtn.addEventListener("click", deleteTodo);

 // add three elements above to the list item
 listItem.append(description);
 listItem.append(markCompleteBtn);
 listItem.append(deleteBtn);

 // append the list item to the todos list
 const todoListEl = document.getElementById("todos-list");
 todoListEl.append(listItem);
}

function createToDo(event){
 event.preventDefault()
 let option = {
   method: "POST",
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({description: document.getElementById('description').value})
 }
 fetch("http://localhost:3000/todos", option)
   .then(res => res.json())
   .then(data => {
     renderTodo(data);
   })
}

function markComplete(event) {
 const todoId = event.target.dataset.todoId;

 let updatePTag = document.getElementById(`description-${todoId}`)
 updatePTag.style.textDecoration = "line-through";
 let options = {
   method: "PUT"
 }
 fetch(`http://localhost:3000/todos/${todoId}`, options);

}

function deleteTodo(event) {
 const todoId = event.target.dataset.todoId;

 let deleteElement = document.getElementById(`todo-${todoId}`)
 deleteElement.parentNode.removeChild(deleteElement);
 let options = {
   method: "DELETE",

 }
 fetch(`http://localhost:3000/todos/${todoId}`, options)
}