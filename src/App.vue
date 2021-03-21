<template>
<div>
	<div class="py-2 flex justify-between px-4 bg-navy text-white">
		<router-link to="/">Home</router-link>
		<div>
			<router-link to="/inputData">Join Group</router-link> |
			<router-link to="/about">About</router-link>
		</div>
	</div>
	<router-view/>
</div>
</template>

<style scoped>
.avatar-size {
	width: 32px;
	height: 32px;
}

.bg-navy {
	background-color:#002E5D;
}

.bg-royal {
	background-color:#0062B8;
}
</style>