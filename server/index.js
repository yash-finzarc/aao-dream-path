// Minimal chat backend: HTTP + WebSocket
import http from "http";
import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

const PORT = process.env.CHAT_SERVER_PORT ? Number(process.env.CHAT_SERVER_PORT) : 8787;

const app = express();
app.use(cors());
app.use(express.json());

// Basic health route
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "chat-backend", port: PORT });
});

// Create HTTP server so ws can attach to same port
const server = http.createServer(app);

// WebSocket server mounted on /ws
const wss = new WebSocketServer({ server, path: "/ws" });

// In-memory clients list and simple broadcast helper
function broadcastJson(data, excludeSocket) {
  const payload = JSON.stringify(data);
  wss.clients.forEach((client) => {
    // 1 === OPEN state
    if (client.readyState === 1 && client !== excludeSocket) {
      client.send(payload);
    }
  });
}

wss.on("connection", (socket, request) => {
  const clientId = Math.random().toString(36).slice(2);
  socket.send(
    JSON.stringify({
      type: "system",
      event: "connected",
      clientId,
      message: "Connected to chat server",
    })
  );

  // Announce join
  broadcastJson({ type: "system", event: "join", clientId }, socket);

  // heartbeat
  socket.isAlive = true;
  socket.on("pong", () => {
    socket.isAlive = true;
  });

  socket.on("message", (raw) => {
    try {
      const parsed = JSON.parse(raw.toString());
      // Basic message format passthrough
      const message = {
        type: "chat",
        clientId,
        timestamp: Date.now(),
        ...parsed,
      };
      // Echo back to sender and broadcast to others
      socket.send(JSON.stringify({ ...message, self: true }));
      broadcastJson(message, socket);
    } catch (err) {
      socket.send(
        JSON.stringify({ type: "error", message: "Invalid JSON message" })
      );
    }
  });

  socket.on("close", () => {
    broadcastJson({ type: "system", event: "leave", clientId });
  });
});

// Periodic heartbeat to terminate dead connections
const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((socket) => {
    if (socket.isAlive === false) {
      try { socket.terminate(); } catch (_) {}
      return;
    }
    socket.isAlive = false;
    try { socket.ping(); } catch (_) {}
  });
}, 30000);

wss.on("close", () => {
  clearInterval(heartbeatInterval);
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[chat-backend] listening on http://localhost:${PORT} (ws path /ws)`);
});


