let socket = io();

$('#entrance-form').submit(function(e){
    e.preventDefault(); 
    let username = $('#name-textbox').val();
    if (username != '') {
        socket.emit('c-user-enter', username);
        console.log('emitting user-enter with username: ' + username);
        $('#name-textbox').val('');
        return false;
    }
});

socket.on('s-greetings', (message) => {
    console.log(message);
});
