"use strict";

const MyView = {
	data() {
		return {
			selectedValue: "",
			equipmentList: [],
			selectedEquipment: ""
		}
	},
	mounted: async function (){
		this.equipmentList =  await window.api.loadEquipmentList();
		const keys = Object.keys(this.equipmentList);
		if (keys.length > 0) {
			this.selectedEquipment = keys[0];
		}
	},
	methods: {
		log(item) {
		  console.log(item)
		},
		changeEquipment() {
			console.log(this.selectedEquipment);
		},
		async test() {
			console.log(this.selectedValue);
			console.log(this.equipmentList);
		},
		menu_openDB() {
			console.log("Open Database");
			window.open();
		},
		menu_openTemplate() {
			console.log("Open Template");
		}
	  }
}

Vue.createApp(MyView).mount("#MyView")
