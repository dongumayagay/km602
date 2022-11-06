<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>
<svelte:head>
	<title>km602</title>
</svelte:head>

<Navbar />
<slot />
<Footer />
