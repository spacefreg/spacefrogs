let socket = io();


console.log("Spacefrogs!");

$('#entrance-form').submit(function(e){
    e.preventDefault(); 
    let username = $('#name-textbox').val();
    console.log(username);
    if (username != '') {
        socket.emit('user-enter', username);
        console.log('emitting user-enter with username: ' + username);
        $('#name-textbox').val('');
        return false;
    }
});