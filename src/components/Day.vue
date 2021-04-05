<template>
	<div>
		<p class="text-center font-bold mt-4" v-text="day.dayName"></p>
		<div class="flex chart-width sm:w-auto">
			<div>
				<br>
				<div v-for="index in 13" :key="_uid + index">
					<p v-text="getMomentTime(index)" class = "w-20 pt-2.5 text-center sm:block bg-white"></p>
				</div>
			</div>
			<div class="flex overflow-x-auto">
				<div v-for="(value, key) in people" :key="key">
					person {{value}}
					key {{key}}
				</div>
				<PersonColumn v-for="(value, key) in people" :key="key" :person="value" :firstPerson="index === 0" ></PersonColumn>
			</div>
		</div>
		
	</div>
</template>

<style scoped>
@media (max-width: 640px) {
	.chart-width {
		width: 100vw;
	}
}
</style>

<script>
import moment from "moment"
// import PersonColumn from "./PersonColumn"
export default {
	components: {
		// PersonColumn
	},
	props: {
		day: Object // name, list of hours, people
	},
	data: () => ({
		people: {}
	}),
	methods: {
		getMomentTime(index) {
			index += 8;
			return moment(index, 'HH').format('hh:mm a')
		},
		getPersonData() {
			this.$root.$data.people.forEach(person => {
				this.people[person.id] = person.availability[this.day.dayName]
			})
		}
	},
	mounted() {
		this.getPersonData();
	}
}
</script>