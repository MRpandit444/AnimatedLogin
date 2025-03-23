import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Additional API routes can be added here
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "up" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
