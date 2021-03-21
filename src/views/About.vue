<template>
  <div>
    <div v-if="person" class="flex items-center p-4 m-4 border">
		<img class="big-avatar-size" alt="" :src="person.avatar"/>
		<div>
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
	<button class="cursor-pointer ml-4 p-1 rounded text-white bg-blue-600" v-if="person" @click="person = null">See Class</button>
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
			person: this.$route.params.person,
			weekData: this.$root.$data.weekData,
		}
	}
}

</script>