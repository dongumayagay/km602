<script>
	import Admin from './Admin.svelte';
	import Sign from './Sign.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';

	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			// ...
			console.log(user);
		} else {
			// User is signed out
			// ...
			console.log('walang nakalogin');
		}
	});
</script>

<h1>this is admin page</h1>

<Sign />
<Admin />
