<script>
    import { db } from '$lib/firebase.js';
    import { collection, addDoc } from 'firebase/firestore';

    export let show = false;

    async function submitHandler(event) {
		const formData = new FormData(event.target);
		const employee = Object.fromEntries(formData);
        employee.pay = 0;
        employee.tip = 0;
        employee.total = 0;
        employee.status = 'paid';
        show=false;
        try {
            await addDoc(collection(db, 'employee'), employee);
        } catch (error) {
            console.log(error);
            alert(error);
        }
        console.log(employee);
	}
</script>


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