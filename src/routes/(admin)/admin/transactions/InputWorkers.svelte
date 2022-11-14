<script>
    let isActive = false;
    export let selected =[];

    function toggleActive() {
        isActive = !isActive
    }


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="form-control" >
    <label for="#" class="label">
      <span class="label-text font-medium">Select Workers <span class="text-red-500 font-extrabold">*</span></span>
    </label>
      <div class="max-w-lg h-13 border border-gray-300 rounded-lg p-3 text-sm font-semibold text-gray-700" on:click|preventDefault|stopPropagation={toggleActive}>{selected.length ? selected.join(", ") : 'Pick workers'}</div>
</div>
{#if isActive}
<div class="flex flex-col gap-3 px-2 py-3 border max-w-lg max-h-32 overflow-y-auto">
    <label>
    <input type="checkbox" class="checkbox rounded-none mr-3 checkbox-sm" value="Ame Watson" bind:group={selected}/> Ame Watson
    </label>
    <label>
    <input type="checkbox" class="checkbox rounded-none mr-3 checkbox-sm" value="John Doe" bind:group={selected}/> John Doe
    </label>
    <label>
    <input type=checkbox class="checkbox rounded-none mr-3 checkbox-sm" value="Johny" bind:group={selected}> Johny
    </label>
</div>
{/if}