<template>
	<div v-if="people[0]">
		<div class="flex justify-between sm:justify-start items-center mt-2 px-10">
			<div class='flex items-center'>
				<div :class="['ml-2 p-4 w-2 border']"></div>
				<p class='ml-2'>Unavailable</p>
			</div>

			<div class='flex items-center'>
				<div :class="['ml-2 p-4 w-2 border bg-royal']"></div>
				<p class='ml-2'>Sometimes Available</p>
			</div>

			<div class='flex items-center'>
				<div :class="['ml-2 p-4 w-2 border bg-navy']"></div>
				<p class='ml-2'>Available</p>
			</div>
		</div>
		<div class="flex justify-center">
			<DayList :week="people"></DayList>
		</div>
	</div>
	<div class="m-2" v-else>
		JK LMAO
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

<script>

import DayList from "../components/DayList"
export default {
	name: 'Home',
	components: {
		DayList
	},
	data: function() {
		return {
			people: this.$root.$data.people,
		}
	},
}
</script>

