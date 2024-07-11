const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('File Transfer Server is running.');
  });

const users = [];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword });
    res.status(200).send("User registered successfully");
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secretkey', { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ filename: req.file.filename });
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('sendFile', (data) => {
        socket.broadcast.emit('receiveFile', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
  });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
