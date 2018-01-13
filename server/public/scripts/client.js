console.log('JavaScript sourced');

$(document).ready(function() {
   console.log('jQuery Sourced');
    getTodos();
});


function getTodos() {
    $.ajax({
        method: 'GET',
        url: '/todoList',
        success: function(response) {
            console.log(response);
        }
    });
}

