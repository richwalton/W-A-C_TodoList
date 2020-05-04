let todoList = {
  todos: [],
  displayTodos: function() {
    console.log("My Todos", this.todos);
  },
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.toggleCompleted;
    this.displayTodos();
  }
  // my solution to above function is set position and booleen for method - toggleCompleted(0, true/false) 
  // toggleCompleted: function(position, toggle) {
  //   this.todos[position].completed = toggle;
  //   this.displayTodos();
  // }
};
console.log(todoList.todos)