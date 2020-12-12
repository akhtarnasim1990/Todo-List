//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listner
document.addEventListener("DOMContentLoaded" , getTodos);
todoButton.addEventListener("click" , addTodo);
todoList.addEventListener("click" , deleteCheck);
filterOption.addEventListener("click" , filterTodo);

//Functions

function addTodo(){
    //Prevent form from submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo =  document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
     const completedButton = document.createElement("button");
     completedButton.innerHTML = '<i class = "fas fa-check"></i>';
     completedButton.classList.add("complete-btn");
     todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
     const trashButton = document.createElement("button");
     trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
     //CHECK EDIT BUTTON
     const editingButton = document.createElement("button");
     editingButton.innerHTML = '<i class = "fas fa-edit"></i>';
     editingButton.classList.add("edit-btn");
     todoDiv.appendChild(editingButton);
     //APPEND TO LIST
     todoList.appendChild(todoDiv);
     // CLEAR TODO INPUT VALUE
     todoInput.value = "";
}
function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend" , function(){
            todo.remove();
        });
    }

    //CHECK MARK
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }

    //EDIT TODO
    if(item.classList[0] === "edit-btn"){
        const todo = item.parentElement;
        // todo.classList.toggle("completed")
        // console.log(localStorage.getItem("todo"));
        // addTodo();
        // console.log(todoInput.value = todo-item.value)
        let x = getTodos();
        console.log(x);
        todo.remove()
        removeLocalTodos(todo)

    }

}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value){
            case "all" :
                todo.style.display = "flex";
                break;
            case "Completed" :
                if(todo.classList.contains("completed")){
                    todo.style.display= "flex" ;
                } 
                else{
                    todo.style.display = "none";
               }   
               break;
            case "Uncompleted" :   
            if(!todo.classList.contains("completed")){
                todo.style.display= "flex" ;
            } 
            else{
                todo.style.display = "none";
           }    
           break;
        }
    });
    
}


function saveLocalTodos(todo){
    //CHECK------HEY Do I alraedy thing is there
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));
}

function getTodos(){
    //CHECK------HEY Do I alraedy thing is there
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo =  document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //CHECK EDIT BUTTON
    const editingButton = document.createElement("button");
    editingButton.innerHTML = '<i class = "fas fa-edit"></i>'; 
    editingButton.classList.add("edit-btn");
    todoDiv.appendChild(editingButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //CHECK------HEY Do I alraedy thing is there
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex) , 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
}



