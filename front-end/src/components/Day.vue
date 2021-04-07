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
				<PersonColumn v-for="(person, index) in students" :key="index" :person="person" :firstPerson="index === 0" ></PersonColumn>
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
		dayIndex: Number,
		people: Array,
	},
	data: () => ({
		students: [],
		moment,
	}),
	methods: {
		getMomentTime(index) {
			index += 8;
			return moment(index, 'HH').format('hh:mm a')
		},
		//Todo: Get all from server.js
		getPersonData() {
			this.students = [];
			this.people.forEach(person => {
				var myPerson = this.$root.$data.people.find(man => man._id === person);
				if (myPerson) {
					this.students.push({id: person, availability: myPerson.availability[moment.weekdays(this.dayIndex)], avatar: myPerson.avatar})
				}
			})
		}
	},
	mounted() {
		this.getPersonData();
	},
	watch: {
		"people"() {
			this.getPersonData();
		}
	}
}
</script>