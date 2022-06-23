const express = require("express");
const app = express();

const port = 9000;

app.use(express.static("client"));

// Se inicia el servidor y se inicializa socket.io 
const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
const io = require("socket.io")(server);
const clients = [];

// Se inicializan las opciones
const options = {
    "0": { votes: 0, label: "Rock", color: randomRGB() },
    "1": { votes: 0, label: "Pop", color: randomRGB() },
    "2": { votes: 0, label: "Reggaeton", color: randomRGB() },
    "3": { votes: 0, label: "Jazz", color: randomRGB() },
    "4": { votes: 0, label: "Electrónicac", color: randomRGB() }
};

// Conexión con el cliente
io.on("connection", (socket) => {
    io.emit("update", options);

    //Cuando se hace el voto
    socket.on("vote", (index) => {
        if (clients.includes(socket.id)) {
            console.log("ya está");
        } else {

            clients.push(socket.id);
            console.log(clients);

            if (options[index]) {
                options[index].votes += 1;
            }

            //Se hace update
            io.emit("update", options);

        }
    });
});

// Para generar los colores aleatoriamente
function randomRGB() {
    const r = () => Math.random() * 256 >> 0;
    return `rgb(${r()}, ${r()}, ${r()})`;
}