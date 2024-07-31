# proyecto_socket
Proyecto de Chat con Sockets en JavaScript

Descripción General

Este proyecto es una aplicación de chat en tiempo real construida usando JavaScript, `Socket.io` y `Node.js`. Los usuarios pueden registrarse, iniciar sesión y comunicarse en un chat en tiempo real que se despliega en la interfaz del navegador.
Necesidades de Recursos y Temas Principales

1. **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.  https://nodejs.org/
2. **Electron**: Framework para construir aplicaciones de escritorio con tecnologías web. https://www.electronjs.org/
3. **Express**: Framework web para Node.js para manejar solicitudes HTTP.
4. **Socket.io**: Biblioteca para la comunicación en tiempo real entre clientes y servidor.
5. **HTML/CSS**: Para construir la interfaz del usuario.
6. **JavaScript (Cliente)**: Para manejar la lógica del cliente y la interacción con `Socket.io`.
7. **JSON**: Para almacenar los datos de los usuarios, opcional.

Estructura del Proyecto

- **server.js**: Archivo principal del servidor.
- **client.html**: Archivo HTML para la interfaz del usuario.
- **client.js**: Archivo JavaScript para la lógica del cliente.
- **styles.css**: Archivo CSS para los estilos de la interfaz.
- **users.json**: Archivo JSON para almacenar los datos de los usuarios.
Paso a Paso del Proyecto

1. **Instalación de Dependencias**:
    
    - Node.js
    - Electron
    - Express
    - Socket.io
    - Body-parser (para manejar datos POST)
      
En la implementación actual, los usuarios registrados se almacenan en un objeto en memoria llamado `users`, el cual no es escalable para aplicaciones mas grandes. Si el servidor se reinicia, todos los usuarios registrados se perderán. 
