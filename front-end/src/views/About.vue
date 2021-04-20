<template>
<div>
	<div v-if="displayPerson" class="flex flex-col sm:flex-row items-center p-4 m-4 border-2 bg-gray-100">
		<img class="big-avatar-size border-2 rounded-full bg-white" alt="" :src="displayPerson.avatar"/>
		<div class="text-center sm:text-left ml-2">
			<p v-text="displayPerson.name"></p>
			<p v-text="displayPerson.phone"></p>
			<p v-text="displayPerson.email"></p>
		</div>
	</div>
	<template v-else>
		<div v-for="person in people" :key="person.id" class="flex items-center cursor-pointer" @click="displayPerson = person">
			<img class="avatar-size" :src="person.avatar" alt="">
			<p v-text="person.name"></p>
		</div>
	</template>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600" 
		v-if="displayPerson" @click="displayPerson = null">See All Students</button>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600" 
		v-if="personIsUser" @click.prevent="redirectToEdit">Edit Availability</button>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-red-600" 
		v-if="personIsUser" @click.prevent="deletePerson(displayPerson._id)">Delete Person</button>
</div>

</template>

<style scoped>
.avatar-size {
width: 32px;
height: 32px;
}
.big-avatar-size {
width: 200px;
height: 200px;
}
</style>

<script>
import axios from "axios"
export default {
data: function() { 
	return {
		displayPerson: this.$root.$data.people.find(person => person._id === this.$route.params.id),
		people: this.$root.$data.people
	}
},
computed: {
	personIsUser() {
		return this.$root.$data.user && this.displayPerson && this.displayPerson._id != '607e19f62a8f8332e049333f'
		&& ((this.$root.$data.user.role === "admin"  && this.displayPerson.role !== "admin")
		|| this.displayPerson._id === this.$root.$data.user._id);
	}
},
methods: {
	//Todo: Call delete endpoint
	// deletePerson(id) {
	// 	const indexToDelete = this.$root.$data.people.findIndex(person => person.id === id);
	// 	this.$root.$data.people.splice(indexToDelete, 1);
	// },
	async deletePerson(id) {
		const logout = (this.displayPerson && this.displayPerson._id === this.$root.$data.user._id);
		try {
			if (logout) {
				this.$root.$data.user = null;
				await axios.delete("/api/people/"); // Logout
			}
			await axios.delete("/api/people/" + id);
			this.$root.getPeople();
			this.$router.push('/');
			return true;
		} catch (error) {
			console.log(error);
		}
	},
	redirectToEdit() {
		this.$router.push({name: 'InputData', params: {personID: this.displayPerson._id}})
	}
},
created() {
	this.$root.getPeople();
	this.$root.getClasses();
}
}

</script>