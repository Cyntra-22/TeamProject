import { writable } from "svelte/store";

interface User {
    id: number | null;
    name: string;
    email: string;
    isLoggedIn: boolean;
}


export const userInfo = writable<User>({
    id: null,
    name: "",
    email: "",
    isLoggedIn: false
});


export function getCurrentUser(): User {
    let currentUser: User;
    userInfo.subscribe(value => {
        currentUser = value;
    })();
    return currentUser!;
}