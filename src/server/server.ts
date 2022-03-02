import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const server = express();
const PORT = process.env.PORT || 29070;

//const publicPath: string = path.join(distPath, 'public');


const __filename: string = fileURLToPath(import.meta.url);

const __dirname: string = path.dirname(__filename);
const distPath: string = path.dirname(__dirname);


console.log('distpath: ' + distPath);


server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

server.use(express.static(path.join(distPath, 'public')));
