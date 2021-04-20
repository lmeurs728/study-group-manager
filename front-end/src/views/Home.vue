<template>
<div>
	<select v-if="classes" class="border-2 ml-4 mt-4" v-model="selectedClass">
		<option v-for="_class in classes" :key="_class._id" :value="_class._id">{{_class.title}}</option>
	</select>
	<button v-if="selectedClass && admin" class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600 mt-4" @click.prevent="$router.push({name: 'AddClass', params: {classID: selectedClass}})">Edit Class</button>
	<div v-if="people && people[0]">
			<div class="sm:flex justify-between sm:justify-start items-center mt-2 px-10">
				<div class='flex items-center'>
					<div :class="['ml-2 p-4 w-2 border']"></div>
					<p class='ml-2'>Unavailable</p>
				</div>

				<div class='flex items-center'>
					<div :class="['ml-2 p-4 w-2 border bg-royal']"></div>
					<p class='ml-2'>Sometimes Available</p>
				</div>

				<div class='flex items-center'>
					<div :class="['ml-2 p-4 w-2 border bg-navy']"></div>
					<p class='ml-2'>Available</p>
				</div>
			</div>
	
		
		<div class="flex justify-center">
			<div class="flex flex-wrap justify-around">
				<template v-for="day in 7">
					<Day class="sm:mx-20" :dayIndex="day - 1" :key="_uid + day" :people="people"></Day>
				</template>
			</div>
		</div>
	</div>
	<div class="m-2" v-else>
		No persons to display
	</div>
</div>
	
</template>

<style scoped>
.bg-navy {
	background-color:#002E5D;
}

.bg-royal {
	background-color:#0062B8;
}
</style>

<script>
import axios from 'axios'
import Day from "../components/Day"
export default {
	name: 'Home',
	components: {
		Day
	},
	computed:{
		admin(){
			return this.$root.$data.user && this.$root.$data.user.role === "admin";
		}
	},
	data: function() {
		return {
			people: [],
			classes: this.$root.$data.classes,
			selectedClass: "",
		}
	},
	async created(){
		try{
			let response = await axios.get("/api/people/loggedIn");
			if(!this.$root.$data.user){
				console.log("Inside of if")
				response = await axios.get("/api/people/");
				this.$root.$data.user = response.data.user;
			}
		}
		catch(e){
			console.log(e);
		}
		this.$root.getPeople();
		this.$root.getClasses();
		this.selectedClass = this.$root.$data.classes[0]?._id;
	},
	watch: {
		"$root.$data.classes"(val){
			this.classes = val;
			this.people = this.$root.$data.classes[0]?.students || []
		},
		selectedClass(val) {
			var classIndex = this.classes.findIndex(_class => _class._id === val);
			
			this.people = this.classes[classIndex]?.students;
		},
	}
}
</script>

