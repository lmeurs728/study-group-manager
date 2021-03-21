<template>
  <div class="m-4">
		<div class="flex mb-2">
			<label for="name" class="pl-2 w-32 block">Name:</label>
			<input class="border ml-2 px-2 py-1" type="text" id="name" name="name" v-model="newPerson.name"><br>
		</div>

		<div class="flex mb-2">
			<label for="phone" class="pl-2 w-32 block">Phone Number:</label>
			<input class="border ml-2 px-2 py-1" type="text" id="phone" name="phone" v-model="newPerson.phone"><br>
		</div>

		<div class="flex mb-2">
			<label for="email" class="pl-2 w-32 block">Email:</label>
			<input class="border ml-2 px-2 py-1" type="text" id="email" name="email" v-model="newPerson.email"><br>
		</div>

		<div class="sm:flex ml-2">
			<InputDay v-for="day in newPerson.availability" :key="day.day" :day="day"></InputDay>
		</div>

		
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600 mt-4" @click="addPerson">Submit</button>
  </div>
</template>

<script>
import InputDay from "../components/input/InputDay"
import eventbus from "../eventbus.js"
export default {
	components: {
		InputDay,
	},
	data: function() {
		return {
			newPerson: this.$route.params.personID ? this.getExistingPerson() : {
				name:' ',
				phone:' ',
				email:' ',
				availability: this.makeEmptyAvailabilityArray()
			},
		}
	},
	methods: {
		makeEmptyAvailabilityArray() {
			let toRet = [];
			for (let day = 0; day < 7; day++) {
				let dayObj = {day}
				dayObj.hours = new Array(13).fill(0);
				toRet.push(dayObj);
			}
			return toRet;
		},
		addPerson(){
			eventbus.$emit('add-person',this.newPerson)
			this.$router.push('/');
		},
		getExistingPerson(){
			let weekData = this.$root.$data.weekData
			let existingPerson = weekData[0].people.find(person => person.id === this.$route.params.personID)
			existingPerson.availability = JSON.parse(JSON.stringify(weekData.map((day,index) => ({day: index, hours: weekData[index].people.find(person => person.id === this.$route.params.personID).availability}))))
			return existingPerson;
		}
	}
}
</script>

