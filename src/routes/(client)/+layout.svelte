<script>
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';
</script>

<svelte:head>
	<title>km602</title>
</svelte:head>

<Navbar />
<slot />
<Footer />
