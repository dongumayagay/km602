<script>
	import { price_matrix } from '$lib/constants';
	export let vehicleType;
</script>

<div class="form-control">
	<label for="#" class="label font-medium">
		<span class="label-text">Vehicle Type<span class="text-red-500 font-extrabold">*</span></span>
	</label>
	<select
		required
		name="vehicle"
		class="select w-full max-w-lg select-bordered"
		bind:value={vehicleType}
	>
		<option disabled selected value="">Type of Vehicle</option>
		{#each Object.keys(price_matrix) as value}<option>{value}</option>{/each}
	</select>
</div>
