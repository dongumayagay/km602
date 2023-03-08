<script>
	let show = false;
</script>


<div class="navbar font-medium sticky top-0 z-50 bg-white shadow-sm text-sky-700 lg:px-16">
	<div class="flex-1 px-2 mx-2 text-blue-500 font-medium text-lg">
	  <a href="/" class="normal-case"><span class="text-yellow-400 pr-2">km602</span>Carwash</a>
	</div>

	<div class="absolute top-0 my-16 bg-sky-50 left-0 w-full {show?`block`:`hidden`}">
		<center><ul class="gap-16 lg:flex min-h-screen">
			<li class="my-12"><a class="active:bg-transparent hover:bg-transparent hover:text-blue-500" href="/">Home</a></li>
			<li class="my-12"><a href="/about" class="active:bg-transparent hover:text-blue-500 hover:bg-transparent">About Us</a></li>
			<li class="my-12"><a href="/services" class="active:bg-transparent  hover:bg-transparent hover:text-blue-500">Our Services</a></li>
			<li class="my-12"><a href="/book" class="rounded-full bg-sky-700 px-8 py-3 text-white hover:bg-sky-600">Book now</a></li>
		  </ul></center>
	</div>

	<div class="flex-none hidden lg:block">
	  <center><ul class="gap-16 lg:flex">
		<li class="mt-8 mx-6 lg:m-0"><a class="active:bg-transparent hover:bg-transparent hover:text-blue-500" href="/">Home</a></li>
		<li class="my-6 mx-6 lg:m-0"><a href="/about" class="active:bg-transparent hover:text-blue-500 hover:bg-transparent">About Us</a></li>
		<li class="my-6 mx-6 lg:m-0"><a href="/services" class="active:bg-transparent  hover:bg-transparent hover:text-blue-500">Our Services</a></li>
		<li class="mb-8 mx-6 lg:m-0"><a href="/book" class="rounded-full bg-sky-700 px-8 py-3 text-white hover:bg-sky-600">Book now</a></li>
	  </ul></center>
	</div>

	<label class="btn btn-ghost swap swap-rotate lg:hidden">
		<input type="checkbox" bind:checked={show}/>
		<svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
		<svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
	</label>
</div>

