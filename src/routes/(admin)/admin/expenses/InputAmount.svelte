<script>
    export let amount;
</script>

<div class="form-control">
    <label for="#" class="label">
        <span class="label-text font-medium"
            >Amount <span class="text-red-500 font-extrabold">*</span></span
        >
    </label>
    <input
        required
        name="amount"
        type="number"
        placeholder="₱0.00"
        class="input input-bordered max-w-md"
        bind:value={amount}
    />
</div>