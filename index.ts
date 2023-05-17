import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";
import onConnect from "./src/web_socket/wsServer";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on("connection", onConnect);
