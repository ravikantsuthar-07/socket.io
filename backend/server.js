import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

import http from 'http'
import {Server} from 'socket.io'
import {handleSocket} from './sockets/socketHandle.js'

import authRoutes from './Routes/authRoutes.js'
import connection from './Config/D.js'
dotenv.config();

connection();


const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000", methods: ['POST', 'GET'], credentials: true } });


app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
	return res.send({
		success: true
	})
})
const PORT = process.env.PORT || 8000;

handleSocket(io)

server.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});