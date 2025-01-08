<script>
	import Quotes from '../controller/quotes.js';
	import {onMount} from 'svelte';
  import Home from '../view/home.svelte' 
	let quote;
	onMount(async () => {
		const quotes = new Quotes();
		try {
			const quotesData = await quotes.GetQuotes();
			quote = quotesData;
		} catch (error) {
			console.error('Failed to fetch quotes:', error.message);
		}
	});

</script>
<svelte:head>
	<title>Knoyan Mitsu | {quote}</title>
</svelte:head>

<Home />
