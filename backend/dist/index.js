import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8000 });
wss.on('connection', (socket) => {
    socket.send("hello from server");
    socket.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState == WebSocket.OPEN && client !== socket) {
                client.send(data.toString());
            }
        });
    });
});
//# sourceMappingURL=index.js.map