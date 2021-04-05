<template>
	<div class="flex flex-wrap justify-around">
		<template v-for="day in 7">
			<Day :dayIndex="day - 1" :key="_uid + day"></Day>
		</template>
	</div>
</template>

<script>
import Day from "./Day"
export default {
	components: {
		Day
	},
}
</script>