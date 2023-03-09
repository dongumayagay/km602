<script>
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores';

	$: if ($userStore) goto('/admin');

	async function submitHandler(event) {
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			await goto('/admin');
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}


	async function resetpass(){
		const confirmed = confirm("Are you sure you want to reset your password?", "Yes", "No");
		const email = "km602system@gmail.com";


		if (confirmed) {
			try {
				await sendPasswordResetEmail(auth, email);
				alert("Password reset email sent! Please check your email");
			} catch (error) {
				// An error occurred
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage + ": " + errorCode);
				console.error(error);
			}
		}

	}


</script>

<svelte:head>
	<title>Admin Login</title>
</svelte:head>

<main class="bg-blue-50 hero min-h-screen px-6">
	<div class="card bg-base-100 shadow-lg lg:px-6 max-w-md">
		<div class="card-body">
			<h1 class="text-3xl mt-3 font-bold text-center">Login</h1>
			<p class="mt-2 tracking-wide text-center">
				Welcome to Admin Access for <span class="text-yellow-400 font-semibold">km602 </span><span
					class="text-blue-500 font-semibold">Carwash</span
				>
			</p>

			<form on:submit|preventDefault={submitHandler} class="flex flex-col gap-2 my-4 mt-10">
				<div class="form-control">
					<p class="label"><span class="label-text">Email</span></p>
					<input
						required
						type="email"
						name="email"
						placeholder="email"
						id=""
						class="input input-bordered"
					/>
				</div>
				<div class="form-control">
					<p class="label"><span class="label-text">Password</span></p>
					<input
						required
						type="password"
						name="password"
						placeholder="password"
						id=""
						class="input input-bordered"
					/>
					<p class="label">
						<button on:click={resetpass}
						class="label-text-alt link link-hover">Forgot password?</button>
					</p>
				</div>
				<div class="form-control my-6">
					<button
						class="btn btn-ghost bg-yellow-400 text-white rounded-full capitalize px-8 text-base hover:bg-yellow-300"
						>Login</button
					>
				</div>
			</form>
		</div>
	</div>
</main>
