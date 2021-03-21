<template>
	<div class="p-4 mr-2 border">
		<p class="text-center border-b" v-text="moment.weekdays(day.day)"></p>
		<div class="flex flex-col items-center">
			<div :class="['ml-20 flex', leftMargin]">
				<p class="w-10">Never</p>
				<p class="w-10 ml-2">Some</p>
				<p class="w-10 mx-2">Always</p>
			</div>
			
			<div v-for="(hour, index) in day.hours" :key="_uid + index">
				<div class="flex h-6">
					<p class="hidden sm:block w-20 text-center" v-if="day.day === 0" v-text="getMomentTime(index)"></p>
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
	computed: {
		leftMargin() {
			return this.day.day === 0 ? "sm:ml-20" : "sm:ml-0";
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