<script>
  import { price_matrix } from '$lib/constants';

  $: options = !!price_matrix[vehicleType] ? Object.keys(price_matrix[vehicleType]) : [];

  let vehicleType = '';
  let wax = false;
  let show = false;
  let payModal = false;

  function setPrice(event) {
    const service = event.target.value;
    if(service === 'Outer only'){
      wax = true;
    }else{
      wax = false
    }
    price = price_matrix[vehicleType][service];
  }
</script>


<div class="flex justify-between">
  <span class="font-semibold text-2xl mb-8">Transactions</span>
    <!-- open modal -->
  <button 
    on:click={()=>show = true}
    class="btn gap-2 w-32 btn-outline rounded-full">New
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>

</div>



<table class="min-w-max w-full table-auto shadow-lg my-6">
    <thead class="">
        <tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg"></th>
            <th class="py-4 px-6 text-left">Transact ID</th>
            <th class="py-4 px-6 text-left">Customer</th>
            <th class="py-4 px-6 text-center">Date & Time</th>
            <th class="rounded-tr-lg py-3 px-6 text-left">Amount</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="rounded-tr-lg py-3 px-6 text-left"></th>
        </tr>
    </thead>
    <tbody class="text-base">
          <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
              <td class="py-4 px-6 text-left font-bold text-sm">1</td>
              <td class="py-4 px-6 text-left text-sm">test id</td>
              <td class="py- px-6 text-left text-sm">
                customer
              </td>
              <td class="py-4 px-6 text-center text-sm">date and time</td> 
              <td class="py-4 px-6 text-left text-sm">₱0.00</td>
              <td class="py-4 px-6 text-center text-sm">
                <span class="bg-orange-100 text-orange-600 py-1 px-3 rounded-full text-xs font-bold">status</span>
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
                      <li><button on:click={()=>payModal=true}>Process Payment</button></li>
                    </ul>
                  </div>
                </div>
              </td>
          </tr>

    </tbody>
  </table>



<!-- new transaction modal -->
<input type="checkbox" class="modal-toggle" bind:checked={show}/>
{#if show}
<div class="modal">
  <div class="modal-box gap-4 w-11/12 max-w-xl">
    <h3 class="font-bold text-lg pb-4 col-span-2">New Transaction</h3>

      <div class="form-control">
        <label for="#" class="label">
            <span class="label-text">Customer's Name</span>
        </label>
        <input type="text" name="customer" placeholder="customer" class="input input-bordered"/>
      </div>
      <div class="form-control">
        <label for="#" class="label">
            <span class="label-text">Vehicle Type</span>
        </label>
          <select required name="vehicle" class="select select-bordered mb-3" bind:value={vehicleType}>
            <option disabled selected value="">Pick your vehicle</option>
            {#each Object.keys(price_matrix) as value}<option>{value}</option>{/each}
          </select>
        
      </div>
      <div class="form-control">
        <label for="#" class="label">
            <span class="label-text">Type of Wash</span>
        </label>

        <select on:change={setPrice} required class="select select-bordered mb-3">
          <option disabled selected value="">Pick your service</option>
          {#each options as value}
            <option>{value}</option>
          {/each}
        </select>
        <label class="flex cursor-pointer {wax?'block' : 'hidden'}">
          <span class="label-text text-red-500 font-bold mr-4">Own wax</span> 
          <input name="wax" type="checkbox" class="checkbox"/>
        </label>
      </div>

      <div class="modal-action col-span-2">
        <button 
        on:click={()=>show=false}
        class="btn btn-ghost rounded-full">cancel</button>

        <button 
        class="btn btn-info rounded-full text-white">Done</button>
      </div>

  </div>


</div>
{/if}

<input type="checkbox" class="modal-toggle" bind:checked={payModal}/>
{#if payModal}
<div class="modal">
  <div class="modal-box ">
    <h3 class="font-bold text-lg">Transaction Summary</h3>
    <hr class="my-2" />
    <div class="grid grid-cols-2 my-8">
      <div class="font-semibold">
          <p class="my-2">Transaction ID:</p>
          <p class="my-2">Customer Name:</p>
          <p class="my-2">Vehicle Type:</p>
          <p class="my-2">Service Type:</p>
          <p class="my-2">Total Amount:</p>
          <p class="mt-16 mb-2">Amount:</p>
          <p class="my-2">Change:</p>
      </div>
      <div>
          <p class="my-2">ID</p>
          <p class="my-2">Name</p>
          <p class="my-2">Vehicle</p>
          <p class="my-2">Service</p>
          <p class="my-2">PHP</p>
          <input type="text" placeholder="Type amount here" class="input input-bordered input-sm w-36 mt-12 mb-2" />
          <input type="text" disabled value="₱ 0.00" class="input input-bordered input-sm w-36 " />
      </div>
  </div>
    <div class="modal-action">
      <button on:click={()=>payModal=false} class="btn btn-ghost rounded-full">cancel</button>
      <button class="btn btn-ghost bg-yellow-400 text-white rounded-full hover:bg-yellow-300 px-8">print</button>
    </div>
  </div>
</div>
{/if}