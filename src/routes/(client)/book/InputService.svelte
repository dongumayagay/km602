<script>
	import { price_matrix } from '$lib/constants';
	export let vehicleType;
	export let price;
	export let what;

	$: options = !!price_matrix[vehicleType] ? Object.keys(price_matrix[vehicleType]) : [];

	function setPrice(event) {
		const service = event.target.value;
		price = price_matrix[vehicleType][service];
	}
</script>

<div class="form-control">
	<label for="#" class="label font-medium">
		<span class="label-text">Type of Service<span class="text-red-500 font-extrabold">*</span></span
		>
	</label>
	<select on:change={setPrice} bind:value={what} name="what" required class="select w-full max-w-md select-bordered">
		<option disabled selected value="">Pick your service</option>
		{#each options as value}
			<option>{value}</option>
		{/each}
	</select>
</div>
