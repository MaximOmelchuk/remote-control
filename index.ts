import { httpServer } from "./src/http_server/index";
import wsServer from "./src/web_socket/wsServer";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

process.on("SIGINT", () => {
  console.log("WebSocket closed!");
  wsServer.close();
  httpServer.close();
  process.exit()
});
