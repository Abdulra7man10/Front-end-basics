const todoList = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
  const nameInput = document.querySelector('.js-todo');
  const name = nameInput.value;
  if (name === '') {
    document.querySelector('.js-message').innerHTML = `You can't add an empty Todo :(`;
    return;
  } 

  const dateInput = document.querySelector('.js-todo-date');
  let date = dateInput.value;
  if (date === '') { //if the user didn't added a date
    const currentDate = new Date().toISOString().slice(0, 10);
    date = currentDate;
  }

  todoList.push({name,date});

  nameInput.value = '';
  dateInput.value = '';

  printTodos();
  saveTodos();
  return;
}

function printTodos() { //generate html
  document.querySelector('.js-message').innerHTML = '';
  let htmlTodos = '';
  for (let i=0; i<todoList.length; i++)
    htmlTodos += 
  `<div>${todoList[i].name}</div>`+
  `<div>${todoList[i].date}</div>`+
  `<button class="delete-todo-button" onclick="deleteTodo(${i})">Delete</button>`
  ;
  document.querySelector('.js-message').innerHTML = htmlTodos;
}

function deleteTodo(index) {
  todoList.splice(index,1);
  printTodos();
  saveTodos();
}

function handleEnter(event) {
  if(event.key === 'Enter')
    addTodo();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}
