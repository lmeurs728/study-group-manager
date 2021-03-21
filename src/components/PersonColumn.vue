<template>
	<div class="flex flex-col items-end">
		<img class="avatar-size cursor-pointer" :src="person.avatar" :alt="person.name[0]" @click.prevent="$router.push({name: 'About', params: {person}})"/>
		<div v-for="(hour, index) in person.availability" :key="_uid + index" class="flex">
			<div :class="[getDayColor(hour), 'p-4 w-2 border']"></div>
		</div>
	</div>
</template>

<style scoped>
.avatar-size {
	width: 32px;
	height: 32px;
}
</style>

<script>
export default {
	props: {
		person: Object,
		firstPerson: Boolean,
	},
	data: function() {
		return {
			showTooltip: false
		}
	},
	methods: {
		getDayColor(hour) {
			return hour === 2 
				? "bg-blue-600" 
				: hour === 1 
					? "bg-yellow-400"
					: "bg-white"
		}
	}
}
</script>