<script>
export let status = 'pending'
</script>



<div class="form-control">
    <label for="#" class="label font-medium">
      <span class="label-text">Status<span class="text-red-500 font-extrabold">*</span></span
      >
    </label>
    <select bind:value={status} name="status" required class="select w-full max-w-md select-bordered">
        <option value="pending">pending</option>
        <option value="on process">on process</option>
    </select>
  </div>