import type { Species } from './species';
interface User {
    username: string,
    password: string,
    species: typeof Species[number]
    preferences: typeof Species[number][]
}
export const users = {
    fluffy: {
        username: 'fluffy',
        password: 'password',
        species: 'Cat',
        preferences: [
            'Cat',
            'Dog',
            'Bird',
            'Rabbit',
        ]
    }
} as const satisfies Record<string, User>;