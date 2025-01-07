<script>
	import Project from '../Json/Project.json';
	import { Icon } from 'svelte-icons-pack';
	import { OiUnlock16, OiLock16, OiRocket16 } from 'svelte-icons-pack/oi';
	import { BsBoxArrowUpRight, BsGithub } from 'svelte-icons-pack/bs';
	import { onMount } from 'svelte';
	let isLoading = true;
	let projects = [];

	onMount(async () => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			projects.value = Project;
		} catch (error) {
			console.error('Error loading projects:', error);
		} finally {
			isLoading = false;
		}
	});
	const skeletonCount = Project.length;
</script>

<div class="">
	{#if isLoading}
		<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
			{#each { length: skeletonCount }}
				<div>
					<div class="bg-white shadow-xl rounded-md h-full flex flex-col animate-pulse">
						<div class="rounded-t-md w-full h-52 bg-gray-200"></div>

						<div class="px-7 py-4 flex flex-col flex-grow">
							<div class="h-8 bg-gray-200 rounded-md mb-2 w-3/4"></div>

							<div class="h-6 bg-gray-200 rounded-md mb-3 w-1/4"></div>

							<div class="flex gap-3 mb-4">
								<div class="h-6 bg-gray-200 rounded-full w-20"></div>
								<div class="h-6 bg-gray-200 rounded-full w-20"></div>
							</div>

							<div class="flex flex-wrap gap-3 mb-4">
								<div class="h-6 bg-gray-200 rounded-full w-24"></div>
								<div class="h-6 bg-gray-200 rounded-full w-24"></div>
								<div class="h-6 bg-gray-200 rounded-full w-24"></div>
							</div>

							<div class="flex-grow space-y-2 mb-4">
								<div class="h-4 bg-gray-200 rounded w-full"></div>
								<div class="h-4 bg-gray-200 rounded w-5/6"></div>
								<div class="h-4 bg-gray-200 rounded w-4/6"></div>
							</div>

							<div class="grid grid-cols-2 gap-3 mt-auto">
								<div class="h-10 bg-gray-200 rounded-full"></div>
								<div class="h-10 bg-gray-200 rounded-full"></div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Actual Content -->
		<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
			{#each Project as project}
				<div class="h-full">
					<div class="bg-white shadow-xl rounded-md h-full flex flex-col">
						<img src={project.image} class="rounded-t-md w-full h-52 object-cover" alt="" />
						<div class="px-7 py-4 flex flex-col flex-grow">
							<h1 class="text-2xl font-bold text-black">
								{project.title}
							</h1>
							<p class="text-black font-semibold mb-1">{project.year}</p>

							<div class="flex flex-wrap gap-3 mb-2">
								{#if project.isPublic}
									<div class="bg-black rounded-full gap-1 px-3 py-1 flex items-center">
										<Icon color="white" size="16" src={OiUnlock16} />
										<p class="text-white font-semibold inline-block">Public</p>
									</div>
								{:else}
									<div class="bg-black rounded-full px-3 py-1 gap-1 flex items-center">
										<Icon color="white" size="16" src={OiLock16} />
										<p class="text-white font-semibold inline-block">Private</p>
									</div>
								{/if}
								{#if project.isLive}
									<div
										v-if="project.isLive"
										class="bg-black rounded-full gap-1 px-3 py-1 flex items-center"
									>
										<Icon color="white" size="16" src={OiRocket16} />
										<p class="text-white font-semibold">Live</p>
									</div>
								{/if}
							</div>
							<div class="flex flex-wrap gap-3 mb-4">
								{#each project.languages as lang}
									<div class="bg-black rounded-full">
										<p class="text-white font-semibold px-3 py-1">{lang}</p>
									</div>
								{/each}
							</div>
							<div class="mb-4 flex-grow">
								<p>{project.description}</p>
							</div>
							{#if project.isPublic || project.isLive}
								<div
									v-if="project.isPublic || project.isLive"
									class={project.isPublic && project.isLive
										? 'grid-cols-2 grid gap-3 mt-auto'
										: 'grid-cols-1 grid gap-3 mt-auto'}
								>
									{#if project.isLive}
										<a
											v-if="project.isLive"
											href={project.link.website}
											class="bg-black rounded-full text-center h-10 flex items-center justify-center gap-2 text-white font-semibold hover:bg-gray-800 transition-colors"
										>
											<Icon color="white" size="16" src={BsBoxArrowUpRight} />

											<!-- <VsxIcon iconName="Send2" :size="20" color="#FFFFFF" type="bold" class="inline-block"/>  -->
											Website
										</a>
									{/if}
									{#if project.isPublic}
										<a
											href={project.link.source_code}
											class="bg-black rounded-full text-center h-10 flex items-center gap-2 justify-center text-white font-semibold hover:bg-gray-800 transition-colors"
										>
											<Icon color="white" size="16" src={BsGithub} />
											<!-- <VsxIcon iconName="Code" :size="20" color="#FFFFFF" type="bold" class="inline-block"/>  -->
											Source Code
										</a>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Skeleton Loading -->

<style>
	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
