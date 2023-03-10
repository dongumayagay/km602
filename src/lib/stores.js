import { readable, writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export const userStore = readable(undefined, (set) => {
	const unsubscribe = onAuthStateChanged(auth, (user) => {
		set(user);
	});
	return () => unsubscribe();
});


export const createSearchStore = (data) =>{

	const { subscribe, set, update } = writable({
		data: data,
		filtered: data,
		search: "",
	})

	return {
		subscribe,
		set,
		update
	}

}


export const searchHandler = (store) => {
	console.log("searchHandler called");
	const searchTerm = store.search.toLowerCase() || "";
	store.filtered = store.data.filter((item) => {
		return item.searchTerms.toLowerCase().includes(searchTerm)
	})
}