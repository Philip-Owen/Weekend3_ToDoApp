console.log('JavaScript sourced');

$(document).ready(function() {
   console.log('jQuery Sourced');
    getTodos();
    $('#submitToDo').on('click', postTodo);
    $('#todosList').on('click', '.btn-success', updateCompleted);
});

function postTodo() {
    let todo = {
        task: $('#todoInput').val()
    }
    console.log(todo);
    
    $.ajax({
        method: 'POST',
        url: '/todoList',
        data: todo,
        success: function(response) {
            console.log('POST response', response);
            getTodos();
        }
    });
}

function getTodos() {
    $.ajax({
        method: 'GET',
        url: '/todoList',
        success: function(response) {
            console.log('GET response', response);
            displayAllToDos(response);
        }
    });
}

function displayAllToDos(todos) {
    $('#todosList').empty();
    for (let i = 0; i < todos.length; i++) {
        displayToDo(todos[i])
    }
}

function displayToDo(todo) {
    let date = todo.task_date
    date = date.split('T');
    date = date[0];

    let $newToDo = $('<tr>');
    $newToDo.append(`<td>${date}</td>`);
    $newToDo.append(`<td>${todo.task}</td>`);

    if (todo.completed == 'Not Complete') {
        $newToDo.append('<td><button class="btn btn-success">Mark Complete</button></td>');
    } else {
        $newToDo.append('<td>Complete</td>');
    }

    $newToDo.append('<td><button class="btn btn-danger">Delete</button></td>');
    
    $newToDo.data(todo);

    $('#todosList').append($newToDo);
}

function updateCompleted() {
    let taskID = $(this).parents('tr').data().id;

    $.ajax({
        method: 'PUT',
        url: '/todoList/completeUpdate/' + taskID,
        success: function(response) {
            console.log('PUT response', response);
            getTodos();
        }
    });
}