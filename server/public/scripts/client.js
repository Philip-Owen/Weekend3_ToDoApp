
// begin document ready
$(document).ready(function() {
    // appends todays date to the page
    let today = new Date;
    $('#date').text('Today\'s Date: ' + today.toDateString());

    getCategories();
    getPriorities();
    getTodos();
    $('#submitToDo').on('click', postTodo);
    $('#todosList').on('click', '.btn-success', updateCompleted);
    $('#todosList').on('click', '.btn-danger', confirmRemove);
    $('#removeConfirmed').on('click', removeTodo);
    $('#removeAllTodos').on('click', confirmRemoveAll);
    $('#removeAllConfirmed').on('click', removeAllTodos);
    $('#orderDate').on('click', orderDate);
    $('#orderDueDate').on('click', orderDueDate);
    $('#orderPriority').on('click', orderPriority);
    $('#orderCategory').on('click', orderCategory);

}); // end document ready


// begin postTodo()
function postTodo() {
    let todo = {
        task: $('#todoInput').val(),
        category: $('#todoCategory option:selected').data().id,
        priority: $('#todoPriority option:selected').data().id,
        dueDate: $('#dueDate').val()
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
                $('#todoPriority').val('Low');
                $('#dueDate').val('');
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

// begin orderDate()
function orderDate() {
    $.ajax({
        method: 'GET',
        url: '/order/orderDate',
        success: function(response) {
            displayAllToDos(response);
        }
    });
} // end orderDate()

// begin orderDueDate()
function orderDueDate() {
    $.ajax({
        method: 'GET',
        url: '/order/orderDueDate',
        success: function(response) {
            displayAllToDos(response);
        }
    });
} // end orderDueDate()

// begin orderPriority()
function orderPriority() {
    $.ajax({
        method: 'GET',
        url: '/order/orderPriority',
        success: function(response) {
            displayAllToDos(response);
        }
    });
} // end orderPriority()

// begin orderCategory()
function orderCategory() {
    $.ajax({
        method: 'GET',
        url: '/order/orderCategory',
        success: function(response) {
            displayAllToDos(response);
        }
    });
} // end orderCategory()


// begin displayAllToDos(todos)
function displayAllToDos(todos) {
    $('#todosList').empty();
    for (let i = 0; i < todos.length; i++) {
        displayToDo(todos[i])
    }
} // end displayAllToDos(todos)


// begin displayToDo(todo)
function displayToDo(todo) {
    let date = formatDate(todo.task_date);
    let dueDate = formatDate(todo.due_date);
    let overDue = overDueTasks(todo.due_date)

    let $newToDo = $('<tr>');
    $newToDo.append(`<td class="ten">${date}</td>`);
    
    if (todo.completed == 'Not Complete') {
        $newToDo.append(`<td class="ten ${overDue}">${dueDate}</td>`);
    } else {
        $newToDo.append(`<td class="ten">${dueDate}</td>`);
    }

    $newToDo.append(`<td class="fifty">${todo.task}</td>`);
    $newToDo.append(`<td class="ten ${todo.priorities}">${todo.priorities}</td>`);
    $newToDo.append(`<td class="ten">${todo.category}</td>`);

    if (todo.completed == 'Not Complete') {
        $newToDo.append('<td class="fifteen"><button class="btn btn-success complete">Mark Complete</button></td>');
    } else {
        $newToDo.append('<td class="fifteen"><span class="glyphicon glyphicon-ok"></span> Complete</td>');
    }

    $newToDo.append('<td class="five"><button class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>');
    $newToDo.data(todo);
    $('#todosList').append($newToDo);
} // end displayToDo(todo)

function formatDate(todoDate) {
    let date;   
    if (todoDate == null) {
        date = ''
    } else {
        date = todoDate
        date = date.split('T');
        date = date[0];
    }
    return date;
}

// begin overDueTasks(todo)
function overDueTasks(todo) {
    let taskDue;
    let today = new Date;
    today = today.toISOString();
    
    if (today > todo) {
        taskDue = 'overDue';
    } else {
        taskDue = '';
    }
    return taskDue;
} // end overDueTasks(todo)


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

// begin getPriorities()
function getPriorities() {
    $.ajax({
        method: 'GET',
        url: '/todoList/priorities',
        success: function(response) {
            prioritiesToList(response);
        }
    });
} // end getPriorities()



// begin categoriesToList(categories)
function categoriesToList(categories) {
    for (let i = 0; i < categories.length; i++) {
        let $option = $('<option>');
        $option.append(categories[i].category);
        $option.data(categories[i]);
        $('#todoCategory').append($option);
    }
} // end categoriesToList(categories)


// begin prioritiesToList(priorities)
function prioritiesToList(priorities) {
    for (let i = 0; i < priorities.length; i++) {
        let $option = $('<option>');
        $option.append(priorities[i].priorities);
        $option.data(priorities[i]);
        $('#todoPriority').append($option);
    }
} // end prioritiesToList(priorities)


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

// begin confirmRemoveAll()
function confirmRemoveAll() {    
    $('#deleteAllModal').modal('show');
} // end confirmRemoveAll()

// begin removeAllTodos()
function removeAllTodos() {
    $.ajax({
        method: 'DELETE',
        url: '/todoList/deleteAllTodos/',
        success: function(response) {
            getTodos();
        }
    });
} // end removeAllTodos()