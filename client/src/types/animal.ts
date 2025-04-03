export interface Animal {
  id: number;
  username: string;
  name: string;
  species: string;
  age: number;
  bio?: string;
  avatar: string;
  speciesPreferences: string[];
  createdAt: Date;
}

// Like represents a user liking another user
export interface Like {
  id: number;
  likerId: number;
  likedId: number;
  createdAt: Date;
}

// Match represents a mutual like between two users
export interface Match {
  id: number;
  user1Id: number;
  user2Id: number;
  createdAt: Date;
  matchedUser: Animal;
}

// LikeResponse is returned when a user likes another user
export interface LikeResponse {
  like: Like;
  isMatch: boolean;
  matchedUser?: Animal;
}