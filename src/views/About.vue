<template>
  <div>
    <div v-if="person" class="flex flex-col sm:flex-row items-center p-4 m-4 border-2 bg-gray-100">
		<img class="big-avatar-size border-2 rounded-full bg-white" alt="" :src="person.avatar"/>
		<div class="text-center sm:text-left ml-2">
			<p v-text="person.name"></p>
			<p v-text="person.phone"></p>
			<p v-text="person.email"></p>
		</div>
	</div>
	<template v-else>
		<div v-for="person1 in weekData[0].people" :key="person1.id" class="flex items-center cursor-pointer" @click="person = person1">
			<img class="avatar-size" :src="person1.avatar" alt="">
			<p v-text="person1.name"></p>
		</div>
	</template>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600" v-if="person" @click="person = null">See Class</button>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600" v-if="person" @click.prevent="$router.push({name: 'InputData', params: {personID:person.id}})">Edit Availability</button>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600" v-if="person" @click.prevent="deletePerson(person.id)">Delete Person</button>
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
			person: this.$root.$data.people.find(person => person.id === this.$route.params.id),
			weekData: this.$root.$data.weekData,
		}
	},
	methods: {
		deletePerson(id) {
			this.weekData.forEach(day => day.people.splice(day.people.findIndex(person => person.id === id), 1))
			this.$router.push('/');
		}
	}
}

</script>