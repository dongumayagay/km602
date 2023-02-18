<script>
	export let name;
</script>

<div class="form-control">
	<label for="#" class="label">
		<span class="label-text font-medium"
			>Full Name <span class="text-red-500 font-extrabold">*</span></span
		>
	</label>
	<input
		bind:value={name}
		required
		name="name"
		type="text"
		placeholder="full name"
		class="input input-bordered max-w-md"
	/>
</div>
