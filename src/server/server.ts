import express from 'express';
import path from 'path';

const server = express();
const PORT = process.env.PORT || 29070;

const distPath: string = path.dirname(__dirname);
const publicPath: string = path.join(distPath, 'public');


server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

server.use(express.static(publicPath));
