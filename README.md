# Menagerie

A dating app for animals to find compatible matches across different species!

## Description

Menagerie lets animals create profiles, specify their species preferences, and discover potential matches through a swipe-based interface. When two animals like each other, they create a match and can start communicating.

## Features

- User authentication system
- Swipe-based interface for discovering potential matches
- Real-time match notifications
- Profile customization
- Matches list view
- Species-based preferences

## Tech Stack

- **Frontend**: React, Tailwind CSS, shadcn/ui, Zustand, TanStack Query
- **Backend**: Express.js, Node.js
- **Database**: In-memory storage (can be swapped with PostgreSQL)
- **Other Tools**: TypeScript, Drizzle ORM, Zod for validation

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/menagerie.git
   cd menagerie
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

This will start both the frontend and backend servers. The application will be available at `http://localhost:5000`.

### Demo Accounts

Use these demo accounts to test the application:

- Username: fluffy, Password: password
- Username: max, Password: password
- Username: pepper, Password: password (Mouse species)
- Username: thunder, Password: password (Horse species)

## Project Structure

```
├── client/           # Frontend code
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   ├── store/        # Zustand state stores
│   │   └── types/        # TypeScript type definitions
├── server/           # Backend code
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API routes
│   └── storage.ts    # Data storage implementation
└── shared/           # Shared code between frontend and backend
    └── schema.ts     # Database schema and types
```

## API Endpoints

- `POST /api/auth/login` - User login
- `GET /api/auth/current` - Get current authenticated user
- `POST /api/auth/logout` - User logout
- `GET /api/users/potential-matches` - Get potential matches for swiping
- `POST /api/likes` - Create a new like (and potentially a match)
- `GET /api/matches` - Get all matches for the current user

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.