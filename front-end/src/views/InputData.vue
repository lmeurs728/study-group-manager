<template>
  <div class="m-4">
		<div v-if="!editing">
			<div class="flex mb-2">
				<label for="username" class="pl-2 w-32 block">Username:</label>
				<input class="border ml-2 px-2 py-1" type="text" id="username" name="username" v-model="newPerson.username"><br>
			</div>

			<div class="flex mb-2">
				<label for="password" class="pl-2 w-32 block">Password:</label>
				<input class="border ml-2 px-2 py-1" type="text" id="password" name="password" v-model="newPerson.password"><br>
			</div>
		</div>

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
			newPerson: {
				name: '',
				phone: '',
				email: '',
				username: '',
				password: '',
				avatar: sampleData[Math.floor(Math.random() *  20)]?.avatar || sampleData[0].avatar,
				availability: this.makeEmptyAvailabilityObject()
			},
			editing: false,
		}
	},
	mounted: function() {
		if (this.$route.params.personID) {
			this.getExistingPerson();
			this.editing = true;
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

		async getExistingPerson(){
			const response = await axios.get("/api/people/find/" + this.$route.params.personID)
			this.newPerson = response.data.user;
		},


		async upload() {
			try {
				if (!this.$route.params.personID) {
					//Create New
					console.log("User:");
					let user = await axios.post('/api/people/', {
						username: this.newPerson.username,
						password: this.newPerson.password,
						name: this.newPerson.name,
						phone: this.newPerson.phone,
						email: this.newPerson.email,
						avatar: this.newPerson.avatar,
						availability: this.newPerson.availability,
					});

					console.log(user.data);
					user = user.data.user;

					this.$root.$data.user = user;
				}

				else {
					//Update
					await axios.put("/api/people/" + this.$route.params.personID, {
						name: this.newPerson.name,
						phone: this.newPerson.phone,
						email: this.newPerson.email,
						avatar: this.newPerson.avatar,
						availability: this.newPerson.availability,
					});
				}
				this.$root.getPeople();
				console.log("Above");
				this.$router.push('/');
				console.log("Below");
				return true;
			} catch (error) {
				console.log(error);
			}
		},

	}
}
</script>

