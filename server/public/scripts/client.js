console.log('JavaScript sourced');

$(document).ready(function() {
    console.log('jQuery Sourced');
    // appends todays date to the page
    let today = new Date;
    let day = today.getDate();
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    $('#date').text('Today\'s Date: ' + month + '/' + day + '/' + year)

    getCategories();
    getTodos();
    $('#submitToDo').on('click', postTodo);
    $('#todosList').on('click', '.btn-success', updateCompleted);
    $('#todosList').on('click', '.btn-danger', confirmRemove);
    $('#removeConfirmed').on('click', removeTodo)
});

function postTodo() {
    let todo = {
        task: $('#todoInput').val(),
        category: $('select option:selected').data().id
    }
    
    // input validation
    if (todo.category == undefined || todo.task.length == 0) {
        $('#warningDiv').removeClass('hide');
    } else {
        $.ajax({
            method: 'POST',
            url: '/todoList',
            data: todo,
            success: function(response) {
                console.log('POST response', response);
                getTodos();
                $('#warningDiv').addClass('hide');
                $('#todoInput').val('');
                $('#todoCategory').val('Category');
            }
        });
    }
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
    $newToDo.append(`<td class="ten">${date}</td>`);
    $newToDo.append(`<td class="sixty">${todo.task}</td>`);
    $newToDo.append(`<td class="ten">${todo.category}</td>`);

    if (todo.completed == 'Not Complete') {
        $newToDo.append('<td class="fifteen"><button class="btn btn-success complete">Mark Complete</button></td>');
    } else {
        $newToDo.append('<td class="fifteen">Complete</td>');
    }

    $newToDo.append('<td class="five"><button class="btn btn-danger">Delete</button></td>');
    
    $newToDo.data(todo);

    $('#todosList').append($newToDo);
}

function updateCompleted() {
    let taskID = $(this).parents('tr').data().id;
    console.log(taskID);
    
    $.ajax({
        method: 'PUT',
        url: '/todoList/completeUpdate/' + taskID,
        success: function(response) {
            console.log('PUT response', response);
            getTodos();
        }
    });
}



function getCategories() {
    $.ajax({
        method: 'GET',
        url: '/todoList/categories',
        success: function(response) {
            console.log(response);
            categoriesToList(response);
        }
    });
}

function categoriesToList(categories) {
    for (let i = 0; i < categories.length; i++) {
        let $option = $('<option>');
        $option.append(categories[i].category);
        $option.data(categories[i]);
        $('#todoCategory').append($option);
    }
}

function confirmRemove() {
    var id = $(this).parents('tr').data('id');
    $('#deleteModal').data('id', id).modal('show');
}

function removeTodo() {
    let taskID = $('#deleteModal').data('id');
    $('#deleteModal').data('id', taskID).modal('show');

    $.ajax({
        method: 'DELETE',
        url: '/todoList/deleteTodo/' + taskID,
        success: function(response) {
            console.log(response);
            getTodos();
        }
    });
}

