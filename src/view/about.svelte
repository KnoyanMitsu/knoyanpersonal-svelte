<script>
	import { Icon } from 'svelte-icons-pack';
	import { IoCodeSlash, IoColorPalette } from 'svelte-icons-pack/io';
	import { SiSvelte } from 'svelte-icons-pack/si';
	import LangChart from '../widget/LangChart.svelte';
</script>

<div class="grid gap-3 lg:grid-cols-4">
	<div class="bg-white shadow-xl rounded-md flex flex-wrap justify-center">
		<div class="px-7 py-4">
			<img src="profile.png" alt="" class="w-52 mb-6 h-52 rounded-xl" srcset="" />
			<h1 class="text-3xl font-bold text-black">Knoyan Mitsu</h1>
			<p class="text-xl text-black">I am a Web Developer.</p>
		</div>
		<div></div>
	</div>
	<div class="grid gap-3 lg:col-span-3">
		<div class="bg-white shadow-xl w-auto h-auto p-7 rounded-md">
			<h1 class="text-3xl font-bold text-black">About Us</h1>
			<pre
				class="whitespace-break-spaces">I am a passionate Website Developer with interests in Web Design, Front-End Development, and Back-End Development. While I still have much to learn, I am always eager to grow and improve.
    
I am proficient in PHP (particularly using Laravel) and have experience working with JavaScript (using Vue.js, still learning) as well as HTML5. In addition, I am exploring mobile application development using Flutter (still a beginner but highly motivated to learn).
    
Beyond coding, I have a creative side: I enjoy drawing scenery, and this creative side make me relax
    
This blend of technical skills and creativity defines who I am and drives my passion for building functional yet visually appealing solutions.
    </pre>
		</div>
		<div class="grid lg:grid-cols-2 gap-3">
			<div class="bg-white shadow-xl w-auto h-auto rounded-md">
				<h1 class="text-3xl font-bold text-black px-7 pt-3">Interests</h1>
				<div class="px-7 py-4 flex gap-6 justify-center items-center h-[70%] flex-grow">
					<div class="flex items-center flex-col">
						<Icon size="40" src={IoCodeSlash} />
						<p class="text-black font-semibold">Programing</p>
					</div>
					<div class="flex items-center flex-col">
						<Icon size="40" src={SiSvelte} />
						<p class="text-black font-semibold">Web Development</p>
					</div>
					<div class="flex items-center flex-col">
						<Icon size="40" src={IoColorPalette} />
						<p class="text-black font-semibold">Drawing</p>
					</div>
				</div>
			</div>
			<div class="bg-white shadow-xl items-center rounded-md">
				<h1 class="text-3xl font-bold text-black px-7 py-3">Skill Languages Programing</h1>
				<LangChart />
				<p class="font-semibold px-7 mb-3">
					Info: This data from my github so this data automatically updated
				</p>
			</div>
		</div>
	</div>
</div>
