<script>
    export let categ;
</script>

<div class="form-control">
    <label for="#" class="label font-medium">
      <span class="label-text">Categories<span class="text-red-500 font-extrabold">*</span></span
      >
    </label>
    <select bind:value={categ} name="categories" required class="select w-full max-w-md select-bordered">
        <option disabled selected value="">Select category</option>
        <option>Payroll</option>
        <option>Cleaning Supplies</option>
        <option>Utilities</option>
        <option>Maintenance</option>
    </select>
  </div>