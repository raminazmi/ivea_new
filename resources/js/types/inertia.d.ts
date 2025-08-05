import { User } from './user';

declare module '@inertiajs/core' {
    interface PageProps {
        auth?: {
            user: User;
        };
    }
}