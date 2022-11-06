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

<main class="bg-blue-50 hero min-h-screen px-6">
	<div class="card bg-base-100 shadow-lg lg:px-6 h-4/5 max-w-md">
		<div class="card-body">
			<h1 class="text-3xl mt-3 font-bold text-center">Login</h1>
			<p class="mt-2 tracking-wide text-center">Welcome to Admin Access for <span class="text-yellow-400 font-semibold">km602 </span><span class="text-blue-500 font-semibold">Carwash</span></p>
		
			<form on:submit|preventDefault={submitHandler} class="flex flex-col gap-2 my-4">
				<div class="form-control">
					<p class="label"><span class="label-text">Email</span></p>
					<input required type="email" name="email" placeholder="email" id=""  class="input input-bordered"/>
				</div>
				<div class="form-control">
					<p class="label"><span class="label-text">Password</span></p>
					<input required type="password" name="password" placeholder="password" id="" class="input input-bordered"/>
					<p class="label"><a href="/" class="label-text-alt link link-hover">Forgot password?</a></p>
				</div>
				<div class="form-control my-6">
					<button class="btn btn-ghost bg-yellow-400 text-white rounded-full capitalize px-8 text-base hover:bg-yellow-300">Login</button>
				</div>
			</form> 
		</div>
	</div>
</main>
<!-- <form on:submit|preventDefault={submitHandler} class="flex flex-col gap-2">
	<input required type="email" name="email" placeholder="email" id="" />
	<input required type="password" name="password" placeholder="password" id="" />
	<button>SIGNIN</button>
</form> -->

<!-- <div class="bg-blue-50 hero min-h-screen">
    <div class="card flex-shrink-0 w-full max-w-sm lg:bg-base-100 lg:shadow-2xl lg:max-w-md lg:p-8">
        <div class="card-body">
            <div class="text-center">
                <h1 class="text-3xl font-bold">Login</h1>
                <p class="py-4 tracking-wide">Welcome to Admin Access for <span class="text-yellow-400 font-semibold">km602 </span><span class="text-blue-500 font-semibold">Carwash</span></p>
            </div>
            <form on:submit|preventDefault={submitHandler}>
                <div class="form-control">
                    <label for="#" class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="email"  placeholder="email" class="input input-bordered"/>
                </div>
                <div class="form-control">
                    <label for="#" class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" class="input input-bordered"/>
                    <label for="#" class="label">
                        <a href="/" class="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div class="form-control mt-6">
                    <button type="submit" class="btn btn-warning">Login</button>
                </div>
            </form>   
        </div>
    </div>
</div> -->