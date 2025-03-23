import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ 
      status: "up",
      timestamp: new Date().toISOString()
    });
  });

  // Authentication routes
  setupAuth(app);

  // Error handling for undefined routes
  app.use("/api/*", (_req, res) => {
    res.status(404).json({ message: "API endpoint not found" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
