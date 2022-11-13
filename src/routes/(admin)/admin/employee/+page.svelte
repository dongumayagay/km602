<script>
  import { db } from '$lib/firebase.js';
  import { collection, query, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';

  let show = false;
  let update = false;
  let listOfEmp = [];

  const employeeCollection = collection(db, 'employee');

  const q = query(employeeCollection);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    listOfEmp = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });


  async function submitHandler(event) {
		const formData = new FormData(event.target);
		const employee = Object.fromEntries(formData);
    employee.pay = 0;
    employee.tip = 0;
    employee.total = 0;
    employee.status = 'unpaid';
    show=false;
    try {
			await addDoc(collection(db, 'employee'), employee);
		} catch (error) {
			console.log(error);
			alert(error);
		}
		console.log(employee);
	}

  async function deleteEmp(id) {
    await deleteDoc(doc(db, 'employee', id));
  }

  let rename = '';
  let empID = '';
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

<div class="flex justify-between">
    <span class="font-semibold text-2xl mb-8">Employee</span>
      <!-- open modal -->
    <button 
      on:click={()=>show = true}
      class="btn gap-2 w-32 btn-outline rounded-full">New
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
</div>






<table class="min-w-max w-full table-auto shadow-lg">
    <thead class="">
        <tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg "></th>
            <th class="py-4 px-6 text-left">Name</th>
            <th class="py-4 px-6 text-left">Pay</th>
            <th class="py-4 px-6 text-center">Tip</th>
            <th class="py-4 px-6 text-center">Total</th>
            <th class="py-4 px-6 text-center ">Status</th>
            <th class="rounded-tr-lg py-3 px-2 text-left"></th>
        </tr>
    </thead>
    <tbody class="text-base">
      {#each listOfEmp as emp, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
            <td class="py-4 px-6 text-left text-sm"><span>{emp.name}</span></td>
            <td class="py- px-6 text-left text-sm">₱ {parseFloat(emp.pay).toFixed(2)}</td>
            <td class="py-4 px-6 text-center text-sm">₱ {parseFloat(emp.tip).toFixed(2)}</td>
            <td class="py-4 px-6 text-center text-sm">₱ {parseFloat(emp.total).toFixed(2)}</td>
            <td class="py-4 px-6 text-center text-sm">
              <span class="py-1 px-3 rounded-full text-xs font-bold bg-red-100 text-red-700">{emp.status}</span>
            </td>
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
                    <li><button>Paid</button></li>
                    <li><button on:click={updateShow(emp.id, emp.name)}>Rename</button></li>
                    <li><button on:click={deleteEmp(emp.id)}>Delete</button></li>
                  </ul>
                </div>
              </div>
            </td>
        </tr>
      {/each}
    </tbody>
</table>









{#if show}
  <div class="fixed inset-0 bg-black/50 grid place-items-center">
    <div class="card w-1/3 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Add New Employee</h2>
        <form on:submit|preventDefault={submitHandler}>
          <div class="form-control py-4">
              <label for="#" class="label">
                  <span class="label-text">Full Name</span>
              </label>
              <input type="text" name="name" placeholder="name" class="input input-bordered"/>
          </div>
          <div class="card-actions justify-end">
            <button on:click={()=>show=false} class="btn btn-ghost rounded-full w-24">cancel</button>
            <button class="btn btn-info text-white rounded-full w-24">save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}


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