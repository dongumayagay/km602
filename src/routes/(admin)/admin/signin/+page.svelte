<script>
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';

	$: if ($user) goto('/admin');

	async function submitHandler(event) {
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		console.log(data);
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			await goto('/admin');
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}
</script>

<form on:submit|preventDefault={submitHandler} class="flex flex-col gap-2">
	<input required type="email" name="email" placeholder="email" id="" />
	<input required type="password" name="password" placeholder="password" id="" />
	<button>SIGNIN</button>
</form>
