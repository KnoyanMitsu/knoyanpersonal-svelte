<script>
	import About from '../view/about.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { IoArrowDownSharp } from 'svelte-icons-pack/io';
	import ProjectView from '../view/project.svelte';
	import ContactView from '../view/contact.svelte';
	import Quotes from '../controller/quotes.js';
	import {onMount} from 'svelte';

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
<div class="lg:overflow-y-scroll lg:snap-y lg:snap-mandatory h-screen lg:w-screen">
	<div class="container mx-auto">
		<div class="lg:snap-start h-screen relative">
			<div class="flex justify-center items-center h-screen flex-col">
				<h1 class="lg:text-7xl text-3xl font-bold text-black">Knoyan Mitsu</h1>
				<h1 class="lg:text-4xl text-2xl font-normal text-black">Personal Website</h1>
			</div>
			<!-- Ikon panah di bagian bawah -->
			<div
				class="absolute bottom-0 lg:left-[46%] left-[35%] transform -translate-x-1/2 mb-4 flex flex-col items-center animate-bounce"
			>
				<p class="text-black font-semibold text-xl">Scroll Down</p>
				<Icon size="40" src={IoArrowDownSharp} />
			</div>
		</div>
		<div class="lg:snap-start lg:h-screen justify-center items-center flex mb-8">
			<About />
		</div>
		<div class="lg:snap-start lg:h-screen lg:py-8">
			<h1 class="text-3xl font-bold flex items-center justify-center mb-9 lg:mb-2 text-black">
				Projects
			</h1>
			<div class=" overflow-scroll h-[90%] lg:py-24">
				<ProjectView />
			</div>
		</div>
		<div class="lg:snap-start lg:h-screen justify-center items-center flex mb-8">
			<ContactView />
		</div>
	</div>
</div>
