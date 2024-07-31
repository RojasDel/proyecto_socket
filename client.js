// Esperamos hasta que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('client.js cargado');

    document.getElementById('register-btn').onclick = () => {
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    };


    // Función que se ejecuta cuando se hace clic en el botón de conectar
    document.getElementById('connect').onclick = () => {
        console.log('Botón de conectar clicado');

        // Obtenemos el valor del nombre de usuario y la contraseña desde los campos de entrada
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Creamos una conexión de socket.io con los datos de autenticación
        const socket = io({
            auth: {
                username: username,
                password: password
            }
        });

        // Evento que se ejecuta cuando la conexión es exitosa
        socket.on('connect', () => {
            // Mostramos el área del chat y ocultamos el botón de conectar
            document.getElementById('chat').style.display = 'block';
            document.getElementById('connect').style.display = 'none';
            document.getElementById('password').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            document.getElementById('password').style.display = 'none';
            
        });

        // Evento que se ejecuta cuando se recibe un mensaje del servidor
        socket.on('message', (data) => {
            // Obtenemos el contenedor de mensajes
            const messages = document.getElementById('messages');
            // Creamos un nuevo elemento de div para el mensaje
            const messageElement = document.createElement('div');
            // Establecemos el contenido del mensaje
            messageElement.textContent = `${data.user}: ${data.text}`;
            // Añadimos el nuevo mensaje al contenedor de mensajes
            messages.appendChild(messageElement);
        });

        // Función que se ejecuta cuando se hace clic en el botón de enviar
        document.getElementById('send').onclick = () => {
            // Obtenemos el valor del mensaje desde el campo de entrada
            const message = document.getElementById('message').value;
            // Enviamos el mensaje al servidor
            socket.emit('message', message);
            // Enviamos un evento de actividad para resetear el timeout de inactividad
            socket.emit('activity');
            // Limpiamos el campo de entrada del mensaje
            document.getElementById('message').value = '';
        };

        // Evento que se ejecuta cuando la conexión es desconectada
        socket.on('disconnect', () => {
            // Mostramos una alerta informando que la desconexión fue por inactividad
            alert('Desconectado por inactividad');
            // Ocultamos el área del chat y mostramos el botón de conectar
            document.getElementById('chat').style.display = 'none';
            document.getElementById('login').style.display = 'block';
            document.getElementById('register').style.display = 'block';
            document.getElementById('connect').style.display = 'block';
        });

        // Manejo de errores de conexión
        socket.on('connect_error', (err) => {
            // Mostramos una alerta con el mensaje de error
            alert('Error de autenticación: ' + err.message);
        });
    };


    document.getElementById('toggle-chat').onclick = () => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
            chatContainer.style.display = 'flex';
        } else {
            chatContainer.style.display = 'none';
        }
    };
});
