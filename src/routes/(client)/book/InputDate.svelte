<div class="form-control">
	<label for="#" class="label font-medium">
		<span class="label-text">Date <span class="text-red-500 font-extrabold">*</span></span>
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
		class="input input-bordered max-w-lg"
	/>
</div>
