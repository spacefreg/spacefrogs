//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import coreFunction from '../core/common.js';

console.log('client');
coreFunction();


const socket: io = io();