<template>
<div>
	<div class="border border-b-2 py-2 flex justify-between px-4">
		<router-link to="/">Home</router-link>
		<div>
			<router-link to="/inputData">Join Group</router-link> |
			<router-link to="/about">About</router-link>
		</div>
	</div>
	<router-view/>
</div>
</template>