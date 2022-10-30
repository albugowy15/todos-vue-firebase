<template>
	<header class="py-2 px-4">
		<nav class="flex items-center justify-between">
			<h1 class="font-bold text-lg">Todo List App</h1>
			<ul class="flex items-center justify-center gap-4">
				<li><RouterLink to="/">Home</RouterLink></li>
				<li><RouterLink to="/create">Task Baru</RouterLink></li>
				<li><RouterLink to="/filter">Filter</RouterLink></li>
			</ul>
		</nav>
	</header>
</template>
