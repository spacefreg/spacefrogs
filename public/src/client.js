let socket = io();

const input = document.getElementById('chat-textbox');
const messages = document.querySelector('.messages');

input.addEventListener('keyup', (e) => {
    if (e.key ==="Enter") {
        e.preventDefault();
        let msg = $('#chat-textbox').val();
        console.log(msg);
        if (msg != '') {
            socket.emit('c-message', msg);
            $('#chat-textbox').val('');
        }
    }
});

socket.on('s-message', (message) => {
    const p = document.createElement('p');
    const node = document.createTextNode(message);
    p.appendChild(node);
    messages.appendChild(p);
});
