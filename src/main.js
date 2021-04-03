import Vue from 'vue'
import App from './App.vue'
import router from './router'
import eventbus from './eventbus'
import moment from "moment"
import sampleData from "./sampleData.json"

Vue.config.productionTip = false

function generateWeek() {
	var toRet = [];
	for (var day = 0; day < 7; day++) {
		var personRay = [];
		for (var i = 0; i < 20; i++){
			var perObject = {};
			perObject.id = sampleData[i].id;
			perObject.name = sampleData[i].full_name;
			perObject.phone = sampleData[i].phone;
			perObject.email = sampleData[i].email;
			perObject.avatar = sampleData[i].avatar;
			var dayRay = [];
			for (var hour = 0; hour < 13; hour++) {
				dayRay.push(Math.floor(Math.random() *  3));
			}
			perObject.availability = dayRay;
			personRay.push(perObject);
		}
		toRet.push({dayName: moment.weekdays(day), people: personRay});
	}
	return toRet;
}

function injectAvailabilityToBots() {
	sampleData.forEach((bot, i, bots) => {
		bots[i].availability = {};
		for (var day = 0; day < 7; day++) {
			var dailyAvailability = [];
			for (var hour = 0; hour < 13; hour++) {
				dailyAvailability.push(Math.floor(Math.random() *  3));
			}
			bots[i].availability[moment.weekdays(day)] = dailyAvailability;
		}
	})

	return sampleData;
}
  
const weekData = generateWeek();

const people = injectAvailabilityToBots();

new Vue({
router,
data: function(){
	return {
		weekData,
		people,
	}
},
methods: {
	addPerson(newPerson) {
		const newPersonAvailability = JSON.parse(JSON.stringify(newPerson.availability));
		if (newPerson.id) {
			for (let i = 0; i < 7; i++) {
				this.weekData[i].people.find(person => person.id === newPerson.id).availability = newPersonAvailability[i].hours;
			}
			return;
		}

		var perObject = {
			id: this.weekData[0].people[this.weekData[0].people.length - 1]?.id + 1 || 1,
			name: newPerson.name,
			phone: newPerson.phone,
			email: newPerson.email,
			avatar: sampleData[Math.floor(Math.random() *  20)]?.avatar || sampleData[0].avatar
		}

		for (let i = 0; i < 7; i++) {
			perObject.availability = newPerson.availability[i].hours;
			this.weekData[i].people.push(JSON.parse(JSON.stringify(perObject)));
		}
	}
},
created() {
	eventbus.$on("add-person", this.addPerson)
},
render: h => h(App)
}).$mount('#app')
