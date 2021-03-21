<template>
  <div class="about">
    <h1>This is a find groups page</h1>

		<div class="flex mb-2">
			<label for="fname" class="pl-2 w-32 block">Name:</label>
			<input class="border ml-2 px-2 py-1" type="text" id="fname" name="fname"><br>
		</div>

		<div class="flex mb-2">
			<label for="fname" class="pl-2 w-32 block">Phone Number:</label>
			<input class="border ml-2 px-2 py-1" type="text" id="fname" name="fname"><br>
		</div>

		<div class="flex mb-2">
			<label for="fname" class="pl-2 w-32 block">Email:</label>
			<input class="border ml-2 px-2 py-1" type="text" id="fname" name="fname"><br>
		</div>

		<div class="sm:flex">
			<InputDay v-for="day in newPerson.availability" :key="day.day" :day="day"></InputDay>
		</div>

		
	<button @click="addPerson()">Submit</button>
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
			newPerson: {
				name:'',
				phone:'',
				email:'',
				availability: this.makeEmptyAvailabilityArray()
			}
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
		},
	}
}
</script>

