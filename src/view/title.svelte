<script>
  import { IoArrowDownSharp } from 'svelte-icons-pack/io';
	import { Icon } from 'svelte-icons-pack';
</script>

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

