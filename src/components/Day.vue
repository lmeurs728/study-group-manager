<template>
	<div>
		<p class="text-center" v-text="day.dayName"></p>
		<div class="flex chart-width overflow-x-scroll">
			<PersonColumn v-for="(person, index) in day.people" :key="person.id" :person="person" :firstPerson="index === 0" ></PersonColumn>
		</div>
	</div>
</template>

<style scoped>
.chart-width {
	width: 100vw;
}
</style>

<script>
import PersonColumn from "./PersonColumn"
export default {
	components: {
		PersonColumn
	},
	props: {
		day: Object // name, list of hours, people
	},
}
</script>