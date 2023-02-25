<script>
    export let history;
</script>

<td class="py-4 px-6 text-left text-sm">{history.transactAt}</td>
<td class="py-4 px-6 text-left text-sm">{history.id}</td>
<td class="py- px-6 text-left text-sm">{history.name}</td>
<td class="py-4 px-6 text-left text-sm">
    <span class="py-1 px-3 rounded-full text-xs font-bold {history.where==='in-shop'? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'}">{history.where}</span>
</td>
<td class="px-4 py-3">
    <div  class="flex items-center space-x-4 text-sm">
    <div class="dropdown dropdown-end">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label for='' tabindex="0" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
            <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
        </svg>
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><button>More details</button></li>
        </ul>
    </div>
    </div>
</td>