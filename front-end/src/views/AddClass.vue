<template>
<div v-if="admin" class="ml-4">
	<div>Add Class</div>
	<div class="flex mb-2">
		<label for="title" class="pl-2 w-32 block">Title:</label>
		<input class="border ml-2 px-2 py-1" type="text" id="title" name="title" v-model="newClass.title"><br>
	</div>
	<div class="flex mb-2">
		<label for="professor" class="pl-2 w-32 block">Professor:</label>
		<input class="border ml-2 px-2 py-1" type="text" id="professor" name="professor" v-model="newClass.professor"><br>
	</div>
	<div v-for="person in people" :key="person.id" class="flex items-center">
		<input v-if="newClass.students.includes(person._id)" type="checkbox" checked 
			@input="newClass.students.splice(newClass.students.indexOf(person._id), 1)">
		<input v-else type="checkbox" @input="newClass.students.push(person._id)">
		<img class="avatar-size" :src="person.avatar" alt="">
		<p v-text="person.name"></p>
	</div>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600 mt-4" @click="upload()">Submit</button>
	<button class="cursor-pointer ml-4 p-2 rounded text-white bg-red-600" v-if="$route.params.classID" @click.prevent="deleteClass(newClass._id)">Delete Class</button>
</div>
<div v-else>
	Dang HAcKer
</div>
</template>

<style>
.avatar-size {
	width: 32px;
	height: 32px;
}
</style>

<script>
import axios from "axios";
export default {
	data: function() {
		return {
			newClass: {
				title: "",
				professor: "",
				students: [],
			},
			people: this.$root.$data.people,
			selectedClassID: this.$route.params.classID || ""
		}
	},
	computed:{
		admin(){
			return this.$root.$data.user && this.$root.$data.user.role === "admin";
		}
	},
	mounted: function() {
		this.$root.getPeople();
		this.$root.getClasses();
		if (this.$route.params.classID) {
			this.getExistingClass();
		}
	},
	methods: {
		async getExistingClass(){
			const response = await axios.get("/api/classes/" + this.$route.params.classID)
			this.newClass = response.data;
		},

		async upload() {
			try {
				//var response = null;
				if (!this.$route.params.classID) {
					//Create New
					/*response = */await axios.post('/api/classes', {
						title: this.newClass.title,
						professor: this.newClass.professor,
						students: this.newClass.students,
					});
				}

				else {
					//Update
					await axios.put("/api/classes/" + this.$route.params.classID, {
						title: this.newClass.title,
						professor: this.newClass.professor,
						students: this.newClass.students,
					});
				}
				this.$root.getClasses();
				//this.$router.push({name: 'Home', params: {classID: response?.data._id || this.$route.params.classID}});
				this.$router.push("/");
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async deleteClass(id) {
			try {
				await axios.delete("/api/classes/" + id);
				this.$root.getClasses();
				this.$router.push('/');
				return true;
			} catch (error) {
				console.log(error);
			}
	},
	},
	watch: {
		"$root.$data.people"(val){
			this.people = val;
		},
	}
}
</script>