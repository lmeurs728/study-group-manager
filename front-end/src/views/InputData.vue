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
			<InputDay v-for="(availability, key) in newPerson.availability" :key="key" :day="availability" :dayName="key"></InputDay>
		</div>

		
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600 mt-4" @click="upload()">Submit</button>
  </div>
</template>

<script>
import axios from "axios"
import InputDay from "../components/input/InputDay"
import sampleData from "../sampleData.json"
import moment from "moment"
export default {
	components: {
		InputDay,
	},
	data: function() {
		return {
			newPerson: this.$route.params.personID ? this.getExistingPerson() : {
				name: '',
				phone: '',
				email: '',
				avatar: sampleData[Math.floor(Math.random() *  20)]?.avatar || sampleData[0].avatar,
				availability: this.makeEmptyAvailabilityObject()
			},
		}
	},
	methods: {
		//Good
		makeEmptyAvailabilityObject() {
			let dayObj = {};
			for (let day = 0; day < 7; day++) {
				dayObj[moment.weekdays(day)] = new Array(13).fill(0);
			}
			return dayObj;
		},
		//Todo: If this function is also changing peoples original data, then Change to app.put '/api/people/:id'.
		//If it is adding a new person, might be alil different. 
		// addPerson() {
		// 	if (!this.$route.params.personID) {
		// 		this.$root.$data.people.push(this.newPerson)
		// 	}
		// },
		//Todo: Change function to get specific id -> create new get function In server.js

		async getExistingPerson(){
			return await axios.get("/api/people/" + this.$route.params.personID)
			// return this.$root.$data.people.find(person => person.id === this.$route.params.personID)
		},


		async upload() {
			try {
				// const formData = new FormData();
				// formData.append('photo', this.file, this.file.name)
				// let r1 = await axios.post('/api/photos', formData);
				if(!this.$route.params.personID){
					//Create New
					await axios.post('/api/people', {
						title: this.newPerson.title,
						name: this.newPerson.name,
						phone: this.newPerson.phone,
						email: this.newPerson.email,
						//avatar: this.newPerson.avatar,
						availability: this.newPerson.availability,
					// 	avatar: r1.data.path
					});
				}

				else{
					//Update
					await axios.put("/api/people/" + this.$route.params.personID, {
						title: this.newPerson.title,
						name: this.newPerson.name,
						phone: this.newPerson.phone,
						email: this.newPerson.email,
						avatar: this.newPerson.avatar,
						availability: this.newPerson.availability,
					// 	avatar: r1.data.path
					});
				}
				this.$root.getPeople();
				this.$router.push('/');
				return true;
			} catch (error) {
				console.log(error);
			}
		},

	}
}
</script>

