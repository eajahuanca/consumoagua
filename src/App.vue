<template>
	<CabeceraComponent/>
	<div style="height: 4px;"></div>
	<router-view />
	<PieComponent/>
</template>

<script>
import CabeceraComponent from "@/components/CabeceraComponent.vue";
import PieComponent from "@/components/PieComponent.vue";
export default {
	components: {
		CabeceraComponent,
		PieComponent
	}
}
</script>

