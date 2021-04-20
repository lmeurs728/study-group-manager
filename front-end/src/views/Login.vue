<template>
	<div class="m-4">
		<div class="flex mb-2">
			<label for="username" class="pl-2 w-32 block">Username:</label>
			<input class="border ml-2 px-2 py-1" type="text" id="username" name="username" v-model="user.username"><br>
		</div>

		<div class="flex mb-2">
			<label for="password" class="pl-2 w-32 block">Password:</label>
			<input class="border ml-2 px-2 py-1" type="text" id="password" name="password" v-model="user.password"><br>
		</div>
		<p v-if="errorLogin" class="error">{{errorLogin}}</p>
			
			
		<button class="cursor-pointer ml-4 p-2 rounded text-white bg-blue-600 mt-4" @click="login">Login</button>
	</div>
</template>

<script>
import axios from "axios"
export default {
	
	data: function() {
		return {
			user: {
				username: '',
				password: '',
			},
			errorLogin: '',
		}
	},
	methods: {
		async login() {
			this.errorLogin = '';
			if (!this.user.username || !this.user.password)
				return;
			try {
				let response = await axios.post('/api/people/login', {
					username: this.user.username,
					password: this.user.password,
				});
				this.$root.$data.user = response.data.user;
				this.$router.push('/');
			} catch (error) {
				this.errorLogin = "Error: " + error.response.data.message;
				this.$root.$data.user = null;
			}
		},
	}
}
</script>

