<script>
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Home | km602</title>
</svelte:head>

<main>
    <div class="hero min-h-screen bg-fixed" style="background-image: url(https://images.unsplash.com/photo-1527581849771-416a9d62308e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=870&amp;q=80);">
        <div class="hero-overlay bg-gray-900 bg-opacity-50"></div>
        <div class="hero-content text-center text-neutral-content lg:text-left tracking-wide lg:mr-auto lg:ml-16">
            <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">CLEAN CARS RUN BETTER</h1>
                <p class="mb-5">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                    exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                <a href="/book" class="btn btn-warning hover:bg-yellow-500">Book Now</a>
            </div>
        </div>
    </div>


    <div class="h-screen bg-blue-100 grid grid-cols-2">
        <div class="my-auto mx-auto text-5xl">
            <div class="w-[402px] h-[402px] bg-white rounded-full">
                
            </div>
        </div>
        
        <div class="my-auto mr-16 text-5xl">
            <h1 class="font-bold text-5xl mb-5">AS GOOD AS IT GETS</h1>
            <p class="mb-5 text-lg">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <a href="/services" class="btn btn-warning hover:bg-yellow-500">Our Services</a>
        </div>
    </div>


    <div class="h-80 bg-base-100"></div>

    <Footer />
</main>



