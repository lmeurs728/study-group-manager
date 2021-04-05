<template>
	<div class="flex flex-col items-end">
		<img class="avatar-size cursor-pointer" :src="person.avatar" alt="avatar" @click.prevent="$router.push({name: 'About', params: {id: person.id}})"/>
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

.bg-navy {
	background-color:#002E5D;
}

.bg-royal {
	background-color:#0062B8;
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
			showTooltip: false,
		}
	},
	methods: {
		getDayColor(hour) {
			return hour === 2 
				? "bg-navy" 
				: hour === 1 
					? "bg-royal"
					: "bg-white";
		}
	}
}
</script>