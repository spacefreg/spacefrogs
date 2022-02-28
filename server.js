import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const server = express();
const PORT = process.env.PORT || 29070;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

server.use(express.static(path.join(__dirname, 'public')));
