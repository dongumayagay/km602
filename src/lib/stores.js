import { readable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export const userStore = readable(undefined, (set) => {
	const unsubscribe = onAuthStateChanged(auth, (user) => {
		set(user);
	});
	return () => unsubscribe();
});
