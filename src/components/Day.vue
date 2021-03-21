<template>
	<div>
		<p class="text-center" v-text="day.dayName"></p>
		<div class="flex">
			<!-- <div>
				<div v-for="index in people[0].availability.length" :key="index" class="p-1">1</div>
			</div> -->
			<PersonColumn v-for="(person, index) in day.people" :key="person.id" :person="person" :firstPerson="index === 0" ></PersonColumn>
		</div>
	</div>
</template>

<script>
import PersonColumn from "./PersonColumn"
export default {
	components: {
		PersonColumn
	},
	props: {
		day: Object // name, list of hours, people
	},
}
</script>