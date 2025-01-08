<script>
  import Title from "../view/title.svelte";
  import About from '../view/about.svelte';
  import { Icon } from 'svelte-icons-pack';
  import { IoArrowDownSharp } from 'svelte-icons-pack/io';
  import ProjectView from '../view/project.svelte';
  import ContactView from '../view/contact.svelte';
</script>

<div class="lg:overflow-y-scroll lg:snap-y lg:snap-mandatory h-screen lg:w-screen">
	<div class="container mx-auto">
    <Title />  
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
