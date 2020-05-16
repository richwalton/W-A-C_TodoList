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
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    // get number of todos
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      // Case 1 If everythings true, make everything false(unchecked)
      if (completedTodos === totalTodos) {
        todo.completed = false;
      //Case 2 Otherwise make everything true(checked)   
      } else {
        todo.completed = true;
      }
    });
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
let handlers = {
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
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
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
    todoList.todos.forEach(function(todo, position) {
      let todoLi = document.createElement('li');
      let todoTextWithCompleation = '';

      if (todo.completed === true) {
            todoTextWithCompleation = `(x) ${todo.todoText} `;
          } else {
            todoTextWithCompleation = `( ) ${todo.todoText} `;
          }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompleation;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function () {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEvenetListeners: function () {
  let todosUl = document.querySelector('ul');

  todosUl.addEventListener('click', function (event) {
    let elementClicked = event.target;

    if (elementClicked.className === 'deleteButton') {
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
  });
  }
  
};
view.setUpEvenetListeners();
