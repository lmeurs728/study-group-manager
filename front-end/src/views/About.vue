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
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600" v-if="displayPerson" @click="displayPerson = null">See Class</button>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600" v-if="displayPerson" @click.prevent="$router.push({name: 'InputData', params: {personID:displayPerson.id}})">Edit Availability</button>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600" v-if="displayPerson" @click.prevent="deletePerson(displayPerson.id)">Delete Person</button>
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
export default {
	data: function() {
		return {
			displayPerson: this.$root.$data.people.find(person => person.id === this.$route.params.id),
			people: this.$root.$data.people
		}
	},
	methods: {
		deletePerson(id) {
			const indexToDelete = this.$root.$data.people.findIndex(person => person.id === id);
			this.$root.$data.people.splice(indexToDelete, 1);
			this.$router.push('/');
		}
	}
}

</script>