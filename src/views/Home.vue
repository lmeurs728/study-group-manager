<template>
<div class="flex">
	<DayList :week="weekData"></DayList>
</div>
</template>

<script>

import DayList from "../components/DayList"
import moment from "moment"
export default {
	name: 'Home',
	components: {
		DayList
	},
	data: function() {
		return {
			weekData: this.$root.$data.weekData,
			moment: moment
		}
	},
}
</script>

