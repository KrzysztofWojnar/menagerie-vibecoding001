# Menagerie - Animal Dating App

A Tinder-like dating app for animals with profile matching based on species preferences.

## Overview

Menagerie is a swipe-based dating app designed specifically for animals. Users can create profiles, set their species preferences, and find compatible matches. The app features a swipe interface, match notifications, and a messaging system.

## Features

- User authentication (login/logout)
- Swipe interface for potential matches
- Match notifications when two users like each other
- Profile management
- Species-based matching preferences

## Development

### Running the App

```bash
npm run dev
```

This will start both the backend server and the frontend development server.

### Running Tests

To run all unit tests:

```bash
npm test
```

To run specific test files:

```bash
npx vitest run client/src/utils/format.test.ts
```

To run tests in watch mode during development:

```bash
npx vitest
```

## Tech Stack

- Frontend: React with TypeScript
- UI Components: ShadCN UI
- State Management: Zustand
- CSS: Tailwind CSS
- Backend: Express
- Storage: In-memory database (for demonstration purposes)
- Testing: Vitest and React Testing Library

## Login Credentials

For demo purposes, use the following credentials:
- Username: fluffy
- Password: password