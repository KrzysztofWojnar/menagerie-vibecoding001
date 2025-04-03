import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import memorystore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { loginSchema, insertLikeSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const MemoryStore = memorystore(session);

// Setup session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "pawswipe-secret",
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Session setup
  app.use(session(sessionConfig));
  
  // Passport setup
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configure passport local strategy
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Invalid username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Invalid password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
  
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Auth endpoints
  app.post("/api/auth/login", (req: Request, res: Response, next) => {
    try {
      const parsedData = loginSchema.parse(req.body);
      
      passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message || "Authentication failed" });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.json({
            id: user.id,
            username: user.username,
            name: user.name,
            species: user.species,
            age: user.age,
            bio: user.bio,
            avatar: user.avatar,
            speciesPreferences: user.speciesPreferences
          });
        });
      })(req, res, next);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        next(error);
      }
    }
  });
  
  app.get("/api/auth/current", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = req.user as any;
    
    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      species: user.species,
      age: user.age,
      bio: user.bio,
      avatar: user.avatar,
      speciesPreferences: user.speciesPreferences
    });
  });
  
  app.post("/api/auth/logout", (req: Request, res: Response, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  
  // User endpoints
  app.get("/api/users/potential-matches", async (req: Request, res: Response, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = req.user as any;
      const matches = await storage.getPotentialMatches(user.id);
      
      res.json(matches);
    } catch (error) {
      next(error);
    }
  });
  
  // Like endpoints
  app.post("/api/likes", async (req: Request, res: Response, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = req.user as any;
      const data = { ...req.body, likerId: user.id };
      
      const parsedData = insertLikeSchema.parse(data);
      const like = await storage.createLike(parsedData);
      
      // Check if this created a match
      const existingLike = await storage.getLikeByUserIds(parsedData.likedId, user.id);
      const isMatch = !!existingLike;
      
      if (isMatch) {
        const likedUser = await storage.getUser(parsedData.likedId);
        res.json({ 
          like, 
          isMatch: true,
          matchedUser: likedUser
        });
      } else {
        res.json({ 
          like, 
          isMatch: false 
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        next(error);
      }
    }
  });
  
  // Match endpoints
  app.get("/api/matches", async (req: Request, res: Response, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = req.user as any;
      const matches = await storage.getMatchWithUserDetails(user.id);
      
      res.json(matches);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
