<template>
	<div class="p-4 mr-2 border">
		<p class="text-center border-b" v-text="moment.weekdays(day.day)"></p>
		<div class="flex flex-col items-center">
			<div class="ml-20 flex">
				<p class="w-10">Never</p>
				<p class="w-10 ml-2">Some</p>
				<p class="w-10 mx-2">Always</p>
			</div>
			
			<div v-for="(hour, index) in day.hours" :key="_uid + index">
				<div class="flex">
					<p class="hidden sm:block w-20 text-center" v-if="day === 1" v-text="getMomentTime(index)"></p>
					<p class="sm:hidden w-20 text-center" v-text="getMomentTime(index)"></p>
					<input class="w-10" :value="0" v-model="day.hours[index]" type="radio">
					<input class="ml-2 w-10" :value="1" v-model="day.hours[index]"  type="radio">
					<input class="ml-2 w-10" :value="2" v-model="day.hours[index]"  type="radio">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from "moment";
export default {
	props: {
		day: Object
	},
	data: function() {
		return {
			moment,
		}
	},
	methods: {
		getMomentTime(index) {
			index += 7;
			return moment(index, 'HH').format('h:mm a')
		}
	}
}
</script>