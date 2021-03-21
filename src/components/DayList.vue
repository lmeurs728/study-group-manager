<template>
	<div>
		<template v-for="(day, index) in week">
			<Day :day="day" :key="_uid + index"></Day>
		</template>
	</div>
</template>

<script>
import Day from "./Day"
export default {
	components: {
		Day
	},
	props: {
		week: Array
	}
}
</script>