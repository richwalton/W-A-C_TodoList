let todoList = {
  todos: [],
  
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // get number of todos
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    //Case 1 If everythings true, make everything false(unchecked).
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    //Case 2 Otherwise make everything true(checked) 
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
  
  } 
};
//* using 'Event listeners' more common now and keeps seperation of concerns *//
// var displayTodosButton = document.getElementById('displayTodosButton');
// var toggleAllButton = document.getElementById('toggleAllButton');

// displayTodosButton.addEventListener("click", function() {
//   todoList.displayTodos();
// })

// toggleAllButton.addEventListener("click", function() {
//   todoList.toggleAll();
// })

//*  using 'onclick' in html and a handler object - as per instructor *//
handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "" ;
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(parseInt(changeTodoPositionInput.value), changeTodoTextInput.value);
    // todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);  // Instructor used "element.valueAsNumber"
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function() {
    var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = '';
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  },
};

let view = {
  displayTodos: function () {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      let todoLi = document.createElement('li');
      let todo = todoList.todos[i];
      let todoTextWithCompleation = '';

      if (todo.completed === true) {
        todoTextWithCompleation = `(x) ${todo.todoText}`;
      } else {
        todoTextWithCompleation = `( ) ${todo.todoText}`;
      }

      todoLi.textContent = todoTextWithCompleation;
      todosUl.appendChild(todoLi);
    }
    
  },
  createDeleteButton: function () {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;

  }
};

