<script>
	const booking_times = [
		`8:00 AM`,
		`9:00 AM`,
		`10:00 AM`,
		`11:00 AM`,
		`1:00 PM`,
		`2:00 PM`,
		`3:00 PM`,
		`4:00 PM`,
		`5:00 PM`,
		`6:00 PM`
	];

	export let date;
</script>

<div class="form-control">
	<label for="#" class="label font-medium">
		<span class="label-text">Time <span class="text-red-500 font-extrabold">*</span></span>
	</label>
	<select required name="time" class="select w-full max-w-lg select-bordered">
		<!-- bind:value={bookTime} -->
		<option disabled selected value="">Pick your time</option>
		{#each booking_times as value}
			<option {value}>{value}</option>
		{/each}
	</select>
</div>
