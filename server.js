const express = require('express'); // Importamos el módulo express para crear el servidor web
const http = require('http');  // Importamos el módulo http para crear el servidor HTTP
const socketIo = require('socket.io');  // Importamos el módulo socket.io para la comunicación en tiempo real
const path = require('path');
const bodyParser = require('body-parser');  // Para manejar datos POST



const app = express();  // Creamos una instancia de express
const server = http.createServer(app);  // Creamos un servidor HTTP y le pasamos la instancia de express
const io = socketIo(server);  // Inicializamos socket.io y lo vinculamos con el servidor HTTP



const PORT = process.env.PORT || 3000;  // Definimos el puerto en el que correrá el servidor
const users = {};  // Creamos un objeto para almacenar los usuarios autenticados

app.use(bodyParser.json());  // Middleware para parsear el cuerpo de las soliditudes POST


io.use((socket, next) => {  // Middleware para manejar la autenticación de usuarios
    // Obtenemos el nombre de usuario y la contraseña del handshake de socket.io
    const username = socket.handshake.auth.username;
    const password = socket.handshake.auth.password;
    
    // Verificamos si el usuario y la contraseña son válidos
    if (username && password && authenticateUser(username, password)) {
        // Si la autenticación es exitosa, asignamos el nombre de usuario al socket
        socket.username = username;
        next();
    } else {
        // Si la autenticación falla, pasamos un error al siguiente middleware
        next(new Error('Error de autenticación'));
    }
});


function authenticateUser(username, password) {  // Función simple de autenticación de usuarios
    // Deberías verificar contra una base de datos
    return users [username] === password;
}

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    if(users[username]) {
        return res.status(400).json({error: 'El nombre de usuario ya existe.'});
    }
    users[username] = password;
    res.status(201).json({message: 'Usuario registrado exitosamente.'});
});


app.use(express.static(path.join(__dirname)));  // Servir el archivos estaticos


app.get('/client.html', (req,res) => {  // Servir archivo client.html
    res.sendFile(path.join(__dirname, 'client.html'));
});

// Manejador de eventos cuando un cliente se conecta
io.on('connection', (socket) => {
    console.log(`Usuario ${socket.username} conectado`);

    // Manejador de eventos para mensajes enviados por los clientes
    socket.on('message', (message) => {
        console.log(`Mensaje recibido: ${message} de ${socket.username}`);
        // Emitimos el mensaje a todos los clientes conectados
        io.emit('message', { user: socket.username, text: message });
    });

    // Manejador de eventos cuando un cliente se desconecta
    socket.on('disconnect', () => {
        console.log(`Usuario ${socket.username} desconectado`);
    });

    // Desconectar al cliente después de un periodo de inactividad
    const timeout = setTimeout(() => {
        socket.disconnect();
    }, 60000); // 1 minuto de inactividad

    // Resetear el timeout de inactividad cuando hay actividad
    socket.on('activity', () => {
        clearTimeout(timeout);
    });
});

// Iniciar el servidor y escuchar en el puerto especificado
server.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
