import Vue from 'vue'
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

async function getPeople() {

}
const people = getPeople()

new Vue({
router,
data: function(){
	return {
		people,
	}
},

render: h => h(App)
}).$mount('#app')
