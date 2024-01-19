<script>
	import { price_matrix } from '$lib/constants';
	export let vehicleType;
	export let isVehicleSet;
</script>

<div class="form-control">
	<label for="#" class="label font-medium">
		<span class="label-text {isVehicleSet ? 'text-red-500' : ''}">Vehicle Type<span class="text-red-500 font-extrabold">*</span></span>
	</label>
	<select
		required
		name="vehicle"
		class="select w-full max-w-md select-bordered {isVehicleSet ? 'border-red-500' : ''}"
		on:click={()=>isVehicleSet = vehicleType ? false : isVehicleSet}
		bind:value={vehicleType}
	>
		<option disabled selected value="">Type of Vehicle</option>
		{#each Object.keys(price_matrix) as value}<option>{value}</option>{/each}
	</select>
	{#if isVehicleSet}
	<span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
		Oops! Select your Vehicle first!
	</span>
	{/if}
</div>
