<script>
    export let desc;
</script>


<div class="form-control">
    <label for="#" class="label">
        <span class="label-text font-medium"
            >Description <span class="text-red-500 font-extrabold">*</span></span
        >
    </label>
    <input
        required
        name="description"
        type="text"
        placeholder="Type here"
        class="input input-bordered max-w-md"
        bind:value={desc}
    />
</div>