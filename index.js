"use strict";

const MyView = {
	data() {
		return {
			structure: [
				{
					name: "Item1",
					type: "text"
				},
				{
					name: "Item2",
					type: "pulldown",
					selection: [
						{
							value: 0,
							display: "選択肢１"
						},
						{
							value: 1,
							display: "選択肢２"
						}
					]
				},
				{
					name: "Item3",
					type: "text"
				},
			],
			selectedValue: "",
			equipmentList: [],
			selectedEquipment: ""
		}
	},
	mounted: async function (){
		this.equipmentList = await window.api.loadEquipmentList();
		if (this.equipmentList.length > 0) {
			this.selectedEquipment = this.equipmentList[0];
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
			const result = await window.api.loadEquipmentList();
			this.equipmentList = result;
			this.equipmentList.splice();
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
