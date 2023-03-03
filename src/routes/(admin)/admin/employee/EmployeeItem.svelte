<script>
    import { db } from '$lib/firebase.js';
    import { deleteDoc, updateDoc, doc } from 'firebase/firestore';

    export let emp;
    let rename = '';
    let empID = '';
    let update = false;

    async function deleteEmp(id) {
    await deleteDoc(doc(db, 'employee', id));
    }

    async function updateEmp(id, name){
        rename = name;
        empID = id;
        update=false;
        await updateDoc(doc(db, 'employee', id),{
        name: rename
        });
    }

    function updateShow(id, name){
        update =true;
        empID = id;
        rename = name;
    }

</script>

<td class="py-4 px-6 text-left text-sm"><span>{emp.name}</span></td>
<td class="py- px-6 text-left text-sm">₱ {parseFloat(emp.pay).toFixed(2)}</td>
<td class="py-4 px-6 text-center text-sm">₱ {parseFloat(emp.tip).toFixed(2)}</td>
<td class="py-4 px-6 text-center text-sm">₱ {parseFloat(emp.total).toFixed(2)}</td>
<!-- <td class="py-4 px-6 text-center text-sm">
    <span class="py-1 px-3 rounded-full text-xs font-bold {emp.status==='unpaid'? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}">{emp.status}</span>
</td> -->
<td class=" py-3">
    <div  class="flex items-center space-x-2 text-sm">
    <div class="dropdown dropdown-end">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label for='' tabindex="0" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
            <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
        </svg>
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <!-- <li><button on:click={paymentStatus(emp.id, emp.status)}>Pay</button></li> -->
        <li><button on:click={updateShow(emp.id, emp.name)}>Rename</button></li>
        <li><button on:click={deleteEmp(emp.id)}>Delete</button></li>
        </ul>
    </div>
    </div>
</td>

{#if update}
<div class="fixed inset-0 bg-black/50 grid place-items-center">
  <div class="card w-1/3 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Rename Employee</h2>
        <div class="form-control py-4">
            <label for="#" class="label">
                <span class="label-text">Full Name</span>
            </label>
            <input type="text" name="name" placeholder="name" class="input input-bordered"bind:value={rename}/>
        </div>
        <div class="card-actions justify-end">
          <button on:click={()=>update=false} class="btn btn-ghost rounded-full w-24">cancel</button>
          <button on:click={updateEmp(empID, rename)} class="btn btn-info text-white rounded-full w-24">update</button>
        </div>
    </div>
  </div>
</div>
{/if}