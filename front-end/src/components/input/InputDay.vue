<template>
	<div class="p-4 mr-2 mt-2 border">
		<p class="text-center border-b" v-text="dayName"></p>
		<div class="flex flex-col items-center">
			<div :class="['-ml-8 sm:ml-0 flex', leftMargin]">
				<p class="w-10">Never</p>
				<p class="w-10 ml-2">Some</p>
				<p class="w-10 mx-2">Always</p>
			</div>
			
			<div v-for="(hour, index) in day" :key="_uid + index" class="w-full">
				<div :class="['flex h-6 w-full items-center', grayBG(index)]">
					<p class="hidden sm:block w-20 text-center" v-if="dayName === 'Sunday'" v-text="getMomentTime(index)"></p>
					<p class="sm:hidden w-20 text-center" v-text="getMomentTime(index)"></p>
					<input class="w-10" :value="0" v-model="day[index]" type="radio">
					<input class="ml-2 w-10" :value="1" v-model="day[index]"  type="radio">
					<input class="ml-2 w-10" :value="2" v-model="day[index]"  type="radio">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from "moment";
export default {
	props: {
		day: Array,
		dayName: String,
	},
	data: function() {
		return {
			moment,
		}
	},
	computed: {
		leftMargin() {
			return this.dayName === 'Sunday' ? "sm:ml-20" : "sm:ml-0";
		},
	},
	methods: {
		getMomentTime(index) {
			index += 9;
			return moment(index, 'HH').format('h:mm a')
		},
		grayBG(index) {
			return index % 2 === 0 ? "bg-gray-200" : "bg-white"
		}
	}
}
</script>