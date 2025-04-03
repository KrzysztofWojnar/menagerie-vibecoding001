import { 
  users, type User, type InsertUser, 
  likes, type Like, type InsertLike,
  matches, type Match
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getPotentialMatches(userId: number): Promise<User[]>;
  
  // Like methods
  createLike(like: InsertLike): Promise<Like>;
  getLikeByUserIds(likerId: number, likedId: number): Promise<Like | undefined>;
  
  // Match methods
  createMatch(userId1: number, userId2: number): Promise<Match>;
  getMatchesByUserId(userId: number): Promise<Match[]>;
  getMatchWithUserDetails(userId: number): Promise<(Match & { matchedUser: User })[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private likes: Map<number, Like>;
  private matches: Map<number, Match>;
  
  private userIdCounter: number;
  private likeIdCounter: number;
  private matchIdCounter: number;

  constructor() {
    this.users = new Map();
    this.likes = new Map();
    this.matches = new Map();
    
    this.userIdCounter = 1;
    this.likeIdCounter = 1;
    this.matchIdCounter = 1;
    
    // Add some initial animal profiles
    this.initializeAnimals();
  }
  
  private initializeAnimals() {
    const animals: InsertUser[] = [
      {
        username: "fluffy",
        password: "password",
        name: "Fluffy",
        species: "Persian Cat",
        age: 2,
        bio: "I'm a playful Persian cat who loves naps in the sun and chasing toys.",
        avatar: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        speciesPreferences: ["Persian Cat", "Siamese", "Maine Coon", "British Shorthair"]
      },
      {
        username: "max",
        password: "password",
        name: "Max",
        species: "Golden Retriever",
        age: 3,
        bio: "Energetic Golden Retriever who loves playing fetch and swimming.",
        avatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        speciesPreferences: ["Labrador", "Golden Retriever", "Poodle"]
      },
      {
        username: "oliver",
        password: "password",
        name: "Oliver",
        species: "Siamese Cat",
        age: 1,
        bio: "Curious Siamese who loves exploring and playing with strings.",
        avatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        speciesPreferences: ["Persian Cat", "Siamese", "Maine Coon"]
      },
      {
        username: "bailey",
        password: "password",
        name: "Bailey",
        species: "Labrador",
        age: 4,
        bio: "Friendly Labrador who enjoys long walks and cuddles.",
        avatar: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        speciesPreferences: ["Labrador", "Golden Retriever", "German Shepherd"]
      },
      {
        username: "charlie",
        password: "password",
        name: "Charlie",
        species: "Beagle",
        age: 2,
        bio: "Playful Beagle with a great nose for adventures.",
        avatar: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        speciesPreferences: ["Beagle", "Dachshund", "Poodle"]
      },
      {
        username: "luna",
        password: "password",
        name: "Luna",
        species: "Maine Coon",
        age: 3,
        bio: "Majestic Maine Coon who loves being admired and petted.",
        avatar: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        speciesPreferences: ["Persian Cat", "Maine Coon", "Ragdoll"]
      }
    ];
    
    animals.forEach(animal => {
      this.createUser(animal);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async getPotentialMatches(userId: number): Promise<User[]> {
    const currentUser = await this.getUser(userId);
    if (!currentUser) return [];
    
    // Get users who match the current user's species preferences
    // and who have not already been liked by the current user
    const potentialMatches = Array.from(this.users.values()).filter(user => {
      if (user.id === userId) return false; // Skip self
      
      // Check if the current user's species is in the other user's preferences
      const isCompatible = user.speciesPreferences.includes(currentUser.species);
      
      // Check if the current user has already liked this user
      const hasLiked = Array.from(this.likes.values()).some(
        like => like.likerId === userId && like.likedId === user.id
      );
      
      return isCompatible && !hasLiked;
    });
    
    return potentialMatches;
  }
  
  async createLike(insertLike: InsertLike): Promise<Like> {
    const id = this.likeIdCounter++;
    const createdAt = new Date();
    const like: Like = { ...insertLike, id, createdAt };
    this.likes.set(id, like);
    
    // Check if this creates a match (other user has already liked the current user)
    const hasMatch = Array.from(this.likes.values()).some(
      existingLike => 
        existingLike.likerId === insertLike.likedId && 
        existingLike.likedId === insertLike.likerId
    );
    
    if (hasMatch) {
      await this.createMatch(insertLike.likerId, insertLike.likedId);
    }
    
    return like;
  }
  
  async getLikeByUserIds(likerId: number, likedId: number): Promise<Like | undefined> {
    return Array.from(this.likes.values()).find(
      like => like.likerId === likerId && like.likedId === likedId
    );
  }
  
  async createMatch(userId1: number, userId2: number): Promise<Match> {
    const id = this.matchIdCounter++;
    const createdAt = new Date();
    
    // Ensure the lower user ID is always user1Id for consistency
    const [user1Id, user2Id] = userId1 < userId2 
      ? [userId1, userId2] 
      : [userId2, userId1];
    
    const match: Match = { id, user1Id, user2Id, createdAt };
    this.matches.set(id, match);
    return match;
  }
  
  async getMatchesByUserId(userId: number): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(
      match => match.user1Id === userId || match.user2Id === userId
    );
  }
  
  async getMatchWithUserDetails(userId: number): Promise<(Match & { matchedUser: User })[]> {
    const matches = await this.getMatchesByUserId(userId);
    const matchesWithUserDetails = await Promise.all(
      matches.map(async match => {
        // Get the ID of the other user in the match
        const matchedUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
        const matchedUser = await this.getUser(matchedUserId);
        
        if (!matchedUser) {
          throw new Error(`User with ID ${matchedUserId} not found`);
        }
        
        return {
          ...match,
          matchedUser,
        };
      })
    );
    
    return matchesWithUserDetails;
  }
}

export const storage = new MemStorage();
