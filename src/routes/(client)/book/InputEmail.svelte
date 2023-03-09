<script>
	export let email;
</script>

<div class="form-control">
	<label for="#" class="label">
		<span class="label-text font-medium"
			>Email<span class="text-red-500 font-extrabold">*</span></span
		>
	</label>
	<input
		bind:value={email}
		required
		name="email"
		type="email"
		placeholder="email"
		class="input input-bordered max-w-md"
	/>
</div>
