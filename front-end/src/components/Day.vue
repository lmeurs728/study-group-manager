<template>
	<div>
		<p class="text-center font-bold mt-4" v-text="moment.weekdays(dayIndex)"></p>
		<div class="flex chart-width sm:w-auto">
			<div>
				<br>
				<div v-for="index in 13" :key="_uid + index">
					<p v-text="getMomentTime(index)" class = "w-20 pt-2.5 text-center sm:block bg-white"></p>
				</div>
			</div>
			<div class="flex overflow-x-auto">
				<PersonColumn v-for="(person, index) in people" :key="index" :person="person" :firstPerson="index === 0" ></PersonColumn>
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
import PersonColumn from "./PersonColumn"
export default {
	components: {
		PersonColumn
	},
	props: {
		dayIndex: Number
	},
	data: () => ({
		people: [],
		moment,
	}),
	methods: {
		getMomentTime(index) {
			index += 8;
			return moment(index, 'HH').format('hh:mm a')
		},
		//Todo: Get all from server.js
		getPersonData() {
			this.$root.$data.people.forEach(person => {
				this.people.push({id: person._id, availability: person.availability[moment.weekdays(this.dayIndex)], avatar: person.avatar})
			})
		}
	},
	mounted() {
		this.getPersonData();
	}
}
</script>