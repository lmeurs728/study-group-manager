<template>
<div class="flex-grow">
	<div class="py-2 sm:flex justify-between px-4 bg-navy text-white">
		<router-link to="/">Home</router-link>
		<div>
			<router-link to="/addClass">Add Class</router-link> |
			<router-link to="/inputData">Set Availability</router-link> |
			<router-link to="/about">About</router-link>
		</div>
	</div>
	<router-view/>
</div>
</template>

<style scoped>
.bg-navy {
	background-color:#002E5D;
}

.bg-royal {
	background-color:#0062B8;
}
</style>