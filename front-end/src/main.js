import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
// import moment from "moment"
// import sampleData from "./sampleData.json"

Vue.config.productionTip = false

// function injectAvailabilityToBots() {
// 	sampleData.forEach((bot, i, bots) => {
// 		bots[i].availability = {};
// 		for (var day = 0; day < 7; day++) {
// 			var dailyAvailability = [];
// 			for (var hour = 0; hour < 13; hour++) {
// 				dailyAvailability.push(Math.floor(Math.random() *  3));
// 			}
// 			bots[i].availability[moment.weekdays(day)] = dailyAvailability;
// 		}
// 	})

// 	return sampleData;
// }
  
// const people = injectAvailabilityToBots();

new Vue({
router,
data: function(){
	return {
		classes: [],
		people: [],
	}
},
methods:{
	async getPeople() {
		try {
			let response = await axios.get("/api/people");
			this.people = response.data;
			return true;
		} catch (error) {
			console.log(error);
		}
	},
	async getClasses() {
		try {
			let response = await axios.get("/api/classes");
			this.classes = response.data;
			return true;
		} catch (error) {
			console.log(error);
		}
	}
},

render: h => h(App)
}).$mount('#app')
