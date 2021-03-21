<template>
	<div>
		<p class="text-center font-bold mt-4" v-text="day.dayName"></p>
		<div class="flex chart-width">
			<div>
				<br>
				<div v-for="index in 13" :key="_uid + index">
					<p v-text="getMomentTime(index)" class = "w-20 pt-2.5 text-center sm:block bg-white"></p>
				</div>
			</div>
			<div class="flex overflow-x-scroll">
				<PersonColumn v-for="(person, index) in day.people" :key="person.id" :person="person" :firstPerson="index === 0" ></PersonColumn>
			</div>
		</div>
		
	</div>
</template>

<style scoped>
.chart-width {
	width: 100vw;
}
</style>

<script>
import moment from "moment"
import PersonColumn from "./PersonColumn"
export default {
	components: {
		PersonColumn
	},
	props: {
		day: Object // name, list of hours, people
	},
	methods: {
		getMomentTime(index) {
			index += 8;
			return moment(index, 'HH').format('hh:mm a')
		}
	}
}
</script>