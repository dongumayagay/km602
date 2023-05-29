<script>
	export let date = '';
	export let isDateSet;
</script>

<div class="form-control">
	<label for="#" class="label font-medium">
		<span class="label-text {isDateSet ? 'text-red-500' : ''}">Date <span class="text-red-500 font-extrabold">*</span></span>
	</label>
	<input
		required
		name="date"
		type="date"
		placeholder="date"
		min={new Intl.DateTimeFormat('fr-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(new Date(Date.now() + 3600 * 1000 * 24))}
		class="input input-bordered max-w-md {isDateSet ? 'border-red-500' : ''}"
		bind:value={date}
	/>
	{#if isDateSet}
	<span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
		Oops! Select your date first!
	</span>
	{/if}
</div>
