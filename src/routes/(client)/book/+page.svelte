<script>
	function submitHandler(event) {
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		console.log(data);
	}
</script>

<form on:submit|preventDefault={submitHandler} class=" bg-red-400 p-4 flex flex-col gap-4">
	<h1>BOOK NOW</h1>
	<select required name="what">
		<option>Package 1</option>
		<option>Package 2</option>
		<option>Package 3</option>
	</select>
	<input required type="date" name="date" id="" />
	<input required type="time" name="time" id="" />
	<input required type="text" name="name" id="" placeholder="enter your full name" />
	<input required type="email" name="email" id="" placeholder="enter your email address" />
	<button>Book now</button>
</form>
