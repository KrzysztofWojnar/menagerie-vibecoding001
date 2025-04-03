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

export interface Like {
  id: number;
  likerId: number;
  likedId: number;
  createdAt: Date;
}

export interface Match {
  id: number;
  user1Id: number;
  user2Id: number;
  createdAt: Date;
  matchedUser: Animal;
}

export interface LikeResponse {
  like: Like;
  isMatch: boolean;
  matchedUser?: Animal;
}
