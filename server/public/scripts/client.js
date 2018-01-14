
// begin document ready
$(document).ready(function() {
    // appends todays date to the page
    let today = new Date;
    let date = 'Today\'s Date: ' + (today.getMonth() + 1);
    date += '/' + today.getDate();
    date += '/' + today.getFullYear();
    $('#date').text(date)

    getCategories();
    getTodos();
    $('#submitToDo').on('click', postTodo);
    $('#todosList').on('click', '.btn-success', updateCompleted);
    $('#todosList').on('click', '.btn-danger', confirmRemove);
    $('#removeConfirmed').on('click', removeTodo);
    $('#removeAllTodos').on('click', confirmRemoveAll)
    $('#removeAllConfirmed').on('click', removeAllTodos)
}); // end document ready


// begin postTodo()
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
                getTodos();
                $('#warningDiv').addClass('hide');
                $('#todoInput').val('');
                $('#todoCategory').val('Category');
            }
        });
    }
} // end postTodo()


// begin getTodos()
function getTodos() {

    $.ajax({
        method: 'GET',
        url: '/todoList',
        success: function(response) {
            displayAllToDos(response);
        }
    });
} // end getTodos()


// begin displayAllToDos(todos)
function displayAllToDos(todos) {
    $('#todosList').empty();
    for (let i = 0; i < todos.length; i++) {
        displayToDo(todos[i])
    }
} // end displayAllToDos(todos)


// begin displayToDo(todo)
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

    $newToDo.append('<td class="five"><button class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>');
    $newToDo.data(todo);
    $('#todosList').append($newToDo);
} // end displayToDo(todo)


// begin updateCompleted()
function updateCompleted() {
    let taskID = $(this).parents('tr').data().id;
    $('#completeModal').modal('show');

    $.ajax({
        method: 'PUT',
        url: '/todoList/completeUpdate/' + taskID,
        success: function(response) {
            getTodos();
        }
    });
} // end updateCompleted()


// begin getCategories()
function getCategories() {
    $.ajax({
        method: 'GET',
        url: '/todoList/categories',
        success: function(response) {
            categoriesToList(response);
        }
    });
} // end getCategories()


// begin categoriesToList(categories)
function categoriesToList(categories) {
    for (let i = 0; i < categories.length; i++) {
        let $option = $('<option>');
        $option.append(categories[i].category);
        $option.data(categories[i]);
        $('#todoCategory').append($option);
    }
} // end categoriesToList(categories)


// begin confirmRemove()
function confirmRemove() {
    var id = $(this).parents('tr').data('id');
    console.log($(this).parents('tr').data('id'));
    
    $('#deleteModal').data('id', id).modal('show');
} // end confirmRemove()


// begin removeTodo()
function removeTodo() {
    let taskID = $('#deleteModal').data('id');
    $('#deleteModal').data('id', taskID).modal('show');

    $.ajax({
        method: 'DELETE',
        url: '/todoList/deleteTodo/' + taskID,
        success: function(response) {
            getTodos();
        }
    });
} // end removeTodo()


function confirmRemoveAll() {    
    $('#deleteAllModal').modal('show');
} // end confirmRemove()


function removeAllTodos() {
    $.ajax({
        method: 'DELETE',
        url: '/todoList/deleteAllTodos/',
        success: function(response) {
            getTodos();
        }
    });
}