import type {Species} from './species';
interface User {
    username: string,
    password: string,
    preferences: typeof Species[number][]
}
export const users = {
    fluffy: {
        username: 'fluffy',
        password: 'password',
        preferences: [
            'cat',
            'dog',
            'bird',
            'rabbit',
        ]
    }
} as const satisfies Record<string, User>;