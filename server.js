const express = require('express');
const path = require('path');

const server = express();
const PORT = process.env.PORT || 29070;


server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

server.use(express.static(path.join(__dirname, 'public')));
