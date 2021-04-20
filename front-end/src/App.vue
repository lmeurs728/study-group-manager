<template>
<div class="flex-grow">
	<div class="py-2 sm:flex justify-between px-4 bg-navy text-white">
		<div>
			<router-link to="/">Home</router-link> |
			<router-link v-if="this.user && this.user.role === 'admin'" to="/addClass">Add Class | </router-link> 
			<router-link to="/about">About</router-link>
		</div>
		<span v-if="user">
			
			{{user.name}}
			<span class="cursor-pointer" @click="logout">Logout</span>
		</span>
		<div v-else>
			<router-link to="/inputData">Register</router-link> |
			<router-link to="/login">Login</router-link>
		</div>
		
	</div>
	<router-view/>
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
export default {
	name: 'App',
	computed: {
		user() {
			return this.$root.$data.user;
		}
	},
	methods: {
		async logout() {
			try {
				await axios.delete("/api/people");
				this.$root.$data.user = null;
			} catch (error) {
				this.$root.$data.user = null;
			}
		}
	}
}
</script>